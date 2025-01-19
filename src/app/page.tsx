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
import ReactConfetti from "react-confetti";

export type Player = {
  name: string;
  score: number;
  id: number;
  enteredGame: boolean;
};

export default function Home() {
  const [diceValue, setDiceValue] = useState(allNewDice());
  const [gameStarted, setGameStarted] = useState(false);
  const [liveDiceScore, setLiveDiceScore] = useState(0);
  const [possibleRollScore, setPossibleRollScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [prevRoundScore, setPrevRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [farkle, setFarkle] = useState(false);
  const [allDieHeld, setAllDieHeld] = useState(false);
  const [continueTurn, setContinueTurn] = useState(false);
  const [youWin, setYouWin] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const { totalPossibleRollScore } = allScoring(diceValue);
  const { heldTotalPossibleRollScore } = heldAllScoring(diceValue);

  function rollDice() {
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

      return newDice;
    });
  }

  function holdDie(id: string) {
    setDiceValue(
      diceValue.map((die) => {
        if (die.id === id && die.canBeHeld) {
          return { ...die, held: true ? !die.held : die.held };
        }
        if (die.id === id && die.previouslyHeld) {
          return die;
        }
        return die;
      })
    );
  }

  //setting up the scoring as well as condtions for allDiceHeld
  useEffect(() => {
    setLiveDiceScore(totalPossibleRollScore);
    setCurrentRoundScore(heldTotalPossibleRollScore);
    if (diceValue.every((die) => die.held || die.previouslyHeld)) {
      setAllDieHeld(true);
      setContinueTurn(true);
    }
  }, [diceValue]);

  //setting up players based on how many players there are
  useEffect(() => {
    const initialPlayers = Array.from(
      { length: numberOfPlayers },
      (_, index) => ({
        name: `Player ${index + 1}`,
        score: 0,
        id: index,
        enteredGame: false,
      })
    );
    setPlayers(initialPlayers);
  }, [numberOfPlayers]);

  //winning condition
  useEffect(() => {
    if (
      totalScore >= 10000 &&
      players.find((player) => player.score >= 10000)
    ) {
      setYouWin(true);
    }
  }, [totalScore]);
  //!You just updated this...make sure its good!!!

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
  useEffect(() => {
    setPossibleRollScore(totalPossibleRollScore);
  }, [farkle]);

  function handleClickEnterGame() {
    setTotalScore(currentRoundScore + prevRoundScore);
    setPossibleRollScore(0);
    setPrevRoundScore(0);
    setLiveDiceScore(0);
    setCurrentRoundScore(0);
    setDiceValue(allNewDice());
    rollDice();
    if (numberOfPlayers >= 1) {
      const currentPlayerObj = players.find(
        (player) => player.id === currentPlayer
      );
      if (currentPlayerObj) {
        currentPlayerObj.score += currentRoundScore + prevRoundScore;
      }
      if (
        !currentPlayerObj?.enteredGame &&
        currentRoundScore + prevRoundScore >= 500
      ) {
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === currentPlayer
              ? { ...player, enteredGame: true }
              : player
          )
        );
      }

      endTurnMultiplayer();
    }
  }

  function handleClickEndTurn() {
    setTotalScore((prev) => prev + currentRoundScore + prevRoundScore);
    setPossibleRollScore(0);
    setPrevRoundScore(0);
    setLiveDiceScore(0);
    setCurrentRoundScore(0);
    setDiceValue(allNewDice());
    rollDice();
    if (numberOfPlayers >= 1) {
      const currentPlayerObj = players.find(
        (player) => player.id === currentPlayer
      );
      if (currentPlayerObj) {
        currentPlayerObj.score += currentRoundScore + prevRoundScore;
      }
      endTurnMultiplayer();
    }
  }

  function endTurnMultiplayer() {
    setCurrentPlayer((prevIndex) => (prevIndex + 1) % players.length);
    setPrevRoundScore(0);
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

  const buttonClass =
    "border-2 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:scale-110 tracking-wider";

  const newGameProps = {
    setDiceValue,
    setGameStarted,
    setLiveDiceScore,
    setPossibleRollScore,
    setCurrentRoundScore,
    setPrevRoundScore,
    setTotalScore,
    setFarkle,
    setYouWin,
    players,
    setPlayers,
    setNumberOfPlayers,
    setCurrentPlayer,
    rollDice,
  };

  const sharedFarkleWinningProps = {
    setDiceValue,
    setGameStarted,
    setLiveDiceScore,
    setPossibleRollScore,
    setCurrentRoundScore,
    setPrevRoundScore,
    setFarkle,
    players,
    rollDice,
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {!gameStarted && (
        <div className="mt-auto mb-auto">
          <div className="text-center mt-10 mb-10 flex justify-center align-middle">
            welcome to:
            <span className="text-5xl">FARKLE!</span>
          </div>
          <>
            <PreGameDice />
            <div className="mt-5">
              <NewGame {...newGameProps} />
            </div>
          </>
        </div>
      )}

      {/* all scoring text */}
      {gameStarted && (
        <div className="w-2/3 flex  ml-auto mr-auto mt-auto mb-auto">
          <div className="mr-auto text-left">
            <div>Live Dice Score: {liveDiceScore}</div>
            <div>Possible Roll Score: {possibleRollScore}</div>
            <div>Current Roll Score: {currentRoundScore}</div>
            {prevRoundScore > 0 && (
              <div>Prev Round Score: {prevRoundScore}</div>
            )}
            {players.find((player) => player.enteredGame) &&
              numberOfPlayers === 1 && <div>Total Score: {totalScore}</div>}
          </div>

          {numberOfPlayers > 1 && (
            <div className="ml-auto mt-auto mb-auto">
              <p>Player 1: {players[0].score}</p>
              <p>Player 2: {players[1]?.score}</p>
              {numberOfPlayers > 2 && <p>Player 3: {players[2]?.score}</p>}
              {numberOfPlayers > 3 && <p>Player 4: {players[3]?.score}</p>}
            </div>
          )}
        </div>
      )}
      <div className="mt-auto mb-auto max-w-fit ml-auto mr-auto">
        {numberOfPlayers > 1 && (
          <p className="text-center text-3xl tracking-widest">
            {players.map((player) => {
              if (player.id === currentPlayer) return player.name;
            })}
            &lsquo;s turn
          </p>
        )}

        {/* Dice visuals */}
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

          {gameStarted &&
            !allDieHeld &&
            currentRoundScore > 0 &&
            currentRoundScore + prevRoundScore >= 500 &&
            !players[currentPlayer]?.enteredGame && (
              <button className={buttonClass} onClick={handleClickEnterGame}>
                Enter Game
              </button>
            )}

          {gameStarted &&
            !allDieHeld &&
            currentRoundScore > 0 &&
            totalScore > 0 &&
            players[currentPlayer]?.enteredGame && (
              <button className={buttonClass} onClick={handleClickEndTurn}>
                End Turn
              </button>
            )}
        </div>
      </div>
      {farkle && (
        <FarkleModal
          {...sharedFarkleWinningProps}
          diceValue={diceValue}
          prevRoundScore={prevRoundScore}
          farkle={farkle}
          currentPlayer={currentPlayer}
          endTurnMultiplayer={endTurnMultiplayer}
        />
      )}

      {youWin && (
        <div>
          <ReactConfetti />
          <Winning
            {...sharedFarkleWinningProps}
            totalScore={totalScore}
            setTotalScore={setTotalScore}
            youWin={youWin}
            setYouWin={setYouWin}
            setPlayers={setPlayers}
          />
        </div>
      )}
      <div className="mt-auto mb-5">
        <Rules />
        {gameStarted && <NewGame {...newGameProps} />}
      </div>
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

//! okay....multiplayer how can i do this...
//! maybe through state...so if we have state set up for lets say 4 players....four different states...
