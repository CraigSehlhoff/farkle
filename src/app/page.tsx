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
import { allScoring } from "./lib/scoring/allScoring";

export default function Home() {
  const [diceValue, setDiceValue] = useState(allNewDice());
  const [gameStarted, setGameStarted] = useState(false);
  const [liveDiceScore, setLiveDiceScore] = useState(0);
  const [possibleRollScore, setPossibleRollScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [farkle, setFarkle] = useState(false);

  const {
    singleOneValue,
    singleFiveValue,
    threeOfAKindValue,
    fourOfAKindValue,
    fiveOfAKindValue,
    sixOfAKindValue,
    totalPossibleRollScore,
  } = allScoring(diceValue);
  // console.log(allScoring(diceValue));

  function rollDice() {
    setDiceValue((dice) =>
      dice.map((die) =>
        die.held || die.previouslyHeld
          ? { ...die, previouslyHeld: true, held: false }
          : newDie()
      )
    );
    setPossibleRollScore(totalPossibleRollScore);
    setLiveDiceScore(totalPossibleRollScore);

    console.log("TotalPossibleRollScore rollDice:", totalPossibleRollScore);
    console.log("possibleRollScore:", possibleRollScore);
    // checkFarkle();
  }

  // these are TWO different ways to try and figure out how to get the farkle to work........
  // function checkFarkle() {
  //   if (possibleRollScore === 0) {
  //     setFarkle(true);
  //     // alert("FARKLE!");
  //   }
  // }
  // if (
  //   gameStarted &&
  //   liveDiceScore === 0 &&
  //   diceValue.every((die) => !die.held)
  // ) {
  //   setFarkle(true);
  //   alert("FARKLE!");
  // }

  useEffect(() => {
    setLiveDiceScore(
      singleOneValue +
        singleFiveValue +
        threeOfAKindValue +
        fourOfAKindValue +
        fiveOfAKindValue +
        sixOfAKindValue
    );
    console.log("totalpossiblerollscore use effect:", totalPossibleRollScore);
    console.log("livedicescore use effect:", liveDiceScore);
  }, [diceValue]);

  if (
    gameStarted &&
    liveDiceScore === 0 &&
    totalPossibleRollScore === 0 &&
    diceValue.every((die) => !die.held)
  ) {
    setFarkle(true);
    console.log("FARKLE!");
    setGameStarted(false);
    // alert("FARKLE!");
    console.log("dice value on farkle:", diceValue);
    console.log("live dice score on farkle:", liveDiceScore);
    console.log("possible roll score on farkle:", possibleRollScore);
    console.log("total possible roll score on farkle:", totalPossibleRollScore);
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

  //you just got diceValue.held and diceValue.previouslyHeld to work properly...you're slowly getting there dude

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
      {/* {gameStarted && <div>Possible Roll Score: {possibleRollScore}</div>} */}
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
