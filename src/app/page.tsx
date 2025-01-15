"use client";
import {
  PreGameDice,
  allNewDice,
  LiveDice,
  HeldDice,
  newDie,
} from "./components/Dice";
import { NewGame } from "./components/NewGame";
import Rules from "./lib/Rules";
import { useState, useEffect } from "react";
import { allScoring, heldAllScoring } from "./lib/scoring/allScoring";
import FarkleModal from "./lib/Farkle";
import Winning from "./lib/Winning";

export default function Home() {
  const [diceValue, setDiceValue] = useState(allNewDice());
  const [gameStarted, setGameStarted] = useState(false);
  const [liveDiceScore, setLiveDiceScore] = useState(0);
  const [possibleRollScore, setPossibleRollScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [prevRoundScore, setPrevRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [farkle, setFarkle] = useState(false);
  const [enteredGame, setEnteredGame] = useState(false);
  const [allDieHeld, setAllDieHeld] = useState(false);
  const [continueTurn, setContinueTurn] = useState(false);
  const [youWin, setYouWin] = useState(false);

  const { totalPossibleRollScore } = allScoring(diceValue);
  const { heldTotalPossibleRollScore } = heldAllScoring(diceValue);

  function rollDice() {
    console.log("possible roll score rolldice top:", possibleRollScore);
    setPrevRoundScore((prev) => prev + currentRoundScore);
    setDiceValue((dice) => {
      const newDice = dice.map((die) =>
        die.held || die.previouslyHeld
          ? { ...die, previouslyHeld: true, held: false }
          : newDie()
      );

      const newTotalPossibleRollScore =
        allScoring(newDice).totalPossibleRollScore;

      setPossibleRollScore(newTotalPossibleRollScore);
      console.log("possible roll score rolldice middle:", possibleRollScore);
      return newDice;
    });
    console.log("possible roll score rolldice bottom:", possibleRollScore);
  }

  function keepRolling() {
    setDiceValue((dice) => {
      const newDice = dice.map((die) =>
        die.held || die.previouslyHeld
          ? { ...die, previouslyHeld: false, held: false }
          : newDie()
      );

      return newDice;
    });
    setAllDieHeld(false);
    setContinueTurn(false);
    rollDice();
  }

  useEffect(() => {
    setLiveDiceScore(totalPossibleRollScore);
    setCurrentRoundScore(heldTotalPossibleRollScore);
    if (diceValue.every((die) => die.held || die.previouslyHeld)) {
      setAllDieHeld(true);
      setContinueTurn(true);
    }
  }, [diceValue]);

  //winning condition

  useEffect(() => {
    if (totalScore >= 10000) {
      setYouWin(true);
      console.log(youWin);
    }
  }, [totalScore]);

  useEffect(() => {
    setPossibleRollScore(totalPossibleRollScore);
  }, [farkle]);

  //setting farkle!
  if (
    gameStarted &&
    liveDiceScore === 0 &&
    totalPossibleRollScore === 0 &&
    diceValue.every((die) => !die.held)
  ) {
    setFarkle(true);
    setGameStarted(false);
  }

  function holdDie(id: string) {
    setDiceValue(
      diceValue.map((die) => {
        if (die.id === id) {
          return { ...die, held: true ? !die.held : die.held };
        }
        if (die.id === id && die.previouslyHeld) {
          return die;
        }
        return die;
      })
    );
  }

  function handleClickEnterGame() {
    console.log(diceValue);
    setEnteredGame(true);
    setTotalScore(currentRoundScore + prevRoundScore);
    setPossibleRollScore(0);
    setPrevRoundScore(0);
    console.log("prevRoundScore: enterGame", prevRoundScore);
    setLiveDiceScore(0);
    setCurrentRoundScore(0);
    setDiceValue(allNewDice());
    rollDice();
  }

  function handleClickEndTurn() {
    setTotalScore((prev) => prev + currentRoundScore + prevRoundScore);
    setPossibleRollScore(0);
    setPrevRoundScore(0);
    console.log("prevRoundScore: endTurn", prevRoundScore);
    setLiveDiceScore(0);
    setCurrentRoundScore(0);
    setDiceValue(allNewDice());
    rollDice();
  }

  const buttonClass =
    "border-2 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:scale-110 tracking-wider";

  return (
    <div className="h-screen">
      <div className="text-center mt-10 mb-10 flex justify-center align-middle">
        welcome to:
        <span className="text-5xl">FARKLE!</span>
      </div>
      {!gameStarted && <PreGameDice />}
      <div className="mt-5">
        <NewGame
          setGameStarted={setGameStarted}
          setDiceValue={setDiceValue}
          setLiveDiceScore={setLiveDiceScore}
          setPossibleRollScore={setPossibleRollScore}
          setCurrentRoundScore={setCurrentRoundScore}
          setPrevRoundScore={setPrevRoundScore}
          setTotalScore={setTotalScore}
          setFarkle={setFarkle}
          rollDice={rollDice}
          setEnteredGame={setEnteredGame}
          setYouWin={setYouWin}
        />
      </div>

      {gameStarted && <div>Live Dice Score: {liveDiceScore}</div>}
      {gameStarted && <div>Possible Roll Score: {possibleRollScore}</div>}
      {gameStarted && <div>Current Roll Score: {currentRoundScore}</div>}
      {gameStarted && prevRoundScore > 0 && (
        <div>Prev Round Score: {prevRoundScore}</div>
      )}
      {enteredGame && <div>Total Score: {totalScore}</div>}

      {gameStarted && (
        <div className="text-center mt-5">
          Live Dice: <LiveDice diceValue={diceValue} holdDie={holdDie} />
        </div>
      )}

      {gameStarted && (
        <div className="text-center mt-5">
          Held Dice: <HeldDice diceValue={diceValue} holdDie={holdDie} />
        </div>
      )}

      {/* BUTTONS!!! */}
      <div className="flex justify-center gap-5 mr-auto ml-auto max-w-60 flex-wrap mt-5">
        {gameStarted &&
          !continueTurn &&
          !allDieHeld &&
          currentRoundScore > 0 && (
            <button className={buttonClass} onClick={rollDice}>
              Roll Dice
            </button>
          )}

        {continueTurn && gameStarted && (
          <button className={buttonClass} onClick={keepRolling}>
            Continue Turn
          </button>
        )}

        {/* There also has to be a way that I can stop people from adding dice that DO NOT add any new value to their total score...for example, if they rolled a single 1 they could add ALL other dice and keep rolling that way...there has to be someway to stop this from happening.... */}
        {gameStarted &&
          !enteredGame &&
          !allDieHeld &&
          currentRoundScore > 0 &&
          currentRoundScore + prevRoundScore >= 500 && (
            <button className={buttonClass} onClick={handleClickEnterGame}>
              Enter Game
            </button>
          )}

        {gameStarted &&
          !allDieHeld &&
          currentRoundScore > 0 &&
          totalScore > 0 && (
            <button className={buttonClass} onClick={handleClickEndTurn}>
              End Turn
            </button>
          )}
      </div>
      {farkle && (
        <FarkleModal
          prevRoundScore={prevRoundScore}
          setPrevRoundScore={setPrevRoundScore}
          rollDice={rollDice}
          diceValue={diceValue}
          setDiceValue={setDiceValue}
          setLiveDiceScore={setLiveDiceScore}
          setPossibleRollScore={setPossibleRollScore}
          setCurrentRoundScore={setCurrentRoundScore}
          farkle={farkle}
          setFarkle={setFarkle}
          setGameStarted={setGameStarted}
        />
      )}

      {youWin && (
        <Winning
          youWin={youWin}
          setYouWin={setYouWin}
          totalScore={totalScore}
          setGameStarted={setGameStarted}
          setDiceValue={setDiceValue}
          setLiveDiceScore={setLiveDiceScore}
          setPossibleRollScore={setPossibleRollScore}
          setCurrentRoundScore={setCurrentRoundScore}
          setPrevRoundScore={setPrevRoundScore}
          setTotalScore={setTotalScore}
          setFarkle={setFarkle}
          rollDice={rollDice}
          setEnteredGame={setEnteredGame}
        />
      )}

      <Rules />
    </div>
  );
}

//okay you promised yourself this is what you would do...spell it out completely first and then take it from there...lets breakdown farkle step by step and then build it from there

//dice game with 6 die
//object is to score over 10,000 points
//there can be multiple players
//to play you have to roll the dice
//each die needs the ability to be held
//you score by getting different dice combinations
//one 1 = 100 points
//one 5 = 50 points
//three of a kind = 100 x the number on the die (apart from 1's thats 300points)
//four of a kind = 1000 points
//five of a kind = 2000 points
//scoring using all 6 dice
//six of a kind = 3000 points
//straight = 1500 points
//three pairs = 1500 points
//four of a kind + a pair = 1500 points
//two triplets = 2500 points
//to score a 6-dice combination score, you have to roll it all at once, the dice that you were previously holding DO NOT COUNT towards this combo
//if you have all 6 dice held you MUST roll again
//if you ever have a roll that does NOT score you FARKLE
//if you farkle you lose all points for the round and your turn is over
//you have to score over 500 points to intially begin the game.
//other players can be on the board and scoring before you ever enter the game
//if you are currently playing (you already scored over 500) you can stop rolling and collect your points at any time, as long as you havent farkled and have rolled less than all 6 dice.

//buttons needed
//roll
//end turn
//start game/new game

//display
//current possible turn score
//current total score
//dice vs held dice

//Each die needs different properties
//value
//held
//previously held
//id...nanoid?
