"use client";
import { allNewDice } from "./Dice";

type startGameProps = {
  setGameStarted: (value: boolean) => void;
  setFarkle: (value: boolean) => void;
  rollDice: () => void;
};

type DiceValue = {
  value: number;
  held: boolean;
  previouslyHeld: boolean;
  id: string;
}[];

type newGameProps = {
  setGameStarted: (value: boolean) => void;
  setDiceValue: (value: DiceValue) => void;
  setLiveDiceScore: (value: number) => void;
  setPossibleRollScore: (value: number) => void;
  setCurrentRoundScore: (value: number) => void;
  setTotalScore: (value: number) => void;
  setFarkle: (value: boolean) => void;
  rollDice: () => void;
};

export function StartGame({
  setGameStarted,
  setFarkle,
  rollDice,
}: startGameProps) {
  function startGame() {
    setGameStarted(true);
    setFarkle(false);
    rollDice();
  }
  return (
    <div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export function NewGame({
  setGameStarted,
  setDiceValue,
  setLiveDiceScore,
  setPossibleRollScore,
  setCurrentRoundScore,
  setTotalScore,
  setFarkle,
  rollDice,
}: newGameProps) {
  function newGame() {
    setGameStarted(true);
    setDiceValue(allNewDice());
    setLiveDiceScore(0);
    setPossibleRollScore(0);
    setCurrentRoundScore(0);
    setTotalScore(0);
    setFarkle(false);
    rollDice();
  }
  return (
    <div>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}
