"use client";
import {
  PreGameDice,
  allNewDice,
  LiveDice,
  HeldDice,
  newDie,
} from "./components/Dice";
import { NewGame, StartGame } from "./components/NewGame";
import Rules from "./lib/Rules";
import { useState, useEffect } from "react";
import { allScoring, heldAllScoring } from "./lib/scoring/allScoring";
import FarkleModal from "./lib/Farkle";

export default function Home() {
  const [diceValue, setDiceValue] = useState(allNewDice());
  const [gameStarted, setGameStarted] = useState(false);
  const [liveDiceScore, setLiveDiceScore] = useState(0);
  const [possibleRollScore, setPossibleRollScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [farkle, setFarkle] = useState(false);

  //I want to update the score and what is displayed for the player.
  //Right now I have the live dice score displayed and updating correctly but that is it.
  //The possibleRollScore has to be displayed and it will show the MAX amount of points that the current roll can be immediately after it is rolled.  This can be equal to the liveDiceScore but can not update when liveDiceScore updates during a turn.
  //The currentRoundScore has to be the score that the player just banked.  It should basically work as the inverse of the liveDiceScore.  It will basically be the total score of all the held/previous held dice.

  //right now I am having an issue trying to figure out the currentRoundScore.  There is a good chance that I might have made the scoring functions a bit too precise and since I have each one checking each diceValue to see if they are neither held nor previously held I cant easily get the score of any held or previously held dice.  I feel as If I will need to update each scoring function to be able to give a new value if the dice is held and be able to return that value separately.  I will also have to update the new round score each roll by adding the previous round score to the new round score of the current turn.

  //The currentRoundScore will be the score that is added to the totalScore when the player decides to end their turn.  This has to be at LEAST 500 points for the player to have entered the game.
  // There needs to be another state where the player enters the game.
  //I have to set another state of the totalRound score that will be the total of all the rounds the player took this turn...i.e if they did NOT farkle and used all 6 dice and continue rolling/playing

  const { totalPossibleRollScore } = allScoring(diceValue);
  const { heldSingleOneValue } = heldAllScoring(diceValue);

  function rollDice() {
    setDiceValue((dice) => {
      const newDice = dice.map((die) =>
        die.held || die.previouslyHeld
          ? { ...die, previouslyHeld: true, held: false }
          : newDie()
      );

      const newTotalPossibleRollScore =
        allScoring(newDice).totalPossibleRollScore;
      setPossibleRollScore(newTotalPossibleRollScore);

      return newDice;
    });
  }

  useEffect(() => {
    setLiveDiceScore(totalPossibleRollScore);

    setCurrentRoundScore(heldSingleOneValue);
    // const numDiceHeld = diceValue.reduce((acc, curr) => {
    //   if (curr.held || curr.previouslyHeld) {
    //     acc += 1;
    //   }
    //   return acc;
    // }, 0);
    // if (numDiceHeld > 0) {
    //   const newCurrentRoundScore = allScoring(
    //     diceValue.filter((die) => die.held || die.previouslyHeld)
    //   ).totalPossibleRollScore;
    //   console.log(newCurrentRoundScore);
    // }
    console.log("totalpossiblerollscore use effect:", totalPossibleRollScore);
    console.log("livedicescore use effect:", liveDiceScore);
  }, [diceValue]);

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
        console.log("holdDie p2:", diceValue);
        if (die.id === id && die.previouslyHeld) {
          console.log("holdDie p1:", diceValue);
          return die;
        }
        return die;
      })
    );
  }

  return (
    <div>
      <div className="text-center mt-10 mb-10 flex justify-center align-middle">
        welcome to:
        <span className="text-5xl">FARKLE!</span>
      </div>
      {!gameStarted && <PreGameDice />}
      {/* {!gameStarted && (
        <StartGame
          setGameStarted={setGameStarted}
          setFarkle={setFarkle}
          rollDice={rollDice}
        />
      )} */}
      <NewGame
        setGameStarted={setGameStarted}
        setDiceValue={setDiceValue}
        setLiveDiceScore={setLiveDiceScore}
        setPossibleRollScore={setPossibleRollScore}
        setCurrentRoundScore={setCurrentRoundScore}
        setTotalScore={setTotalScore}
        setFarkle={setFarkle}
        rollDice={rollDice}
      />
      {gameStarted && <div>Live Dice Score: {liveDiceScore}</div>}
      {gameStarted && <div>Possible Roll Score: {possibleRollScore}</div>}
      {gameStarted && <div>Current Round Score: {currentRoundScore}</div>}
      {gameStarted && (
        <div className="text-center">
          Live Dice: <LiveDice diceValue={diceValue} holdDie={holdDie} />
        </div>
      )}
      held dice:
      {gameStarted && (
        <div className="text-center">
          Held Dice: <HeldDice diceValue={diceValue} holdDie={holdDie} />
        </div>
      )}
      {gameStarted && <button onClick={rollDice}>rollDice</button>}
      {farkle && (
        <FarkleModal
          points={
            currentRoundScore ? currentRoundScore : totalPossibleRollScore
          }
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
