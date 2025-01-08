"use client";
import { allNewDice } from "./Dice";

type startGameProps = {
  setGameStarted: (value: boolean) => void;
};

type DiceValue = {
  value: number;
  held: boolean;
  previouslyHeld: boolean;
  id: string;
}[];

type newGameProps = {
  setDiceValue: (value: DiceValue) => void;
  setLiveDiceScore: (value: number) => void;
  setPossibleRollScore: (value: number) => void;
  setCurrentRoundScore: (value: number) => void;
  setTotalScore: (value: number) => void;
  setFarkle: (value: boolean) => void;
};

export function StartGame({ setGameStarted }: startGameProps) {
  function startGame() {
    setGameStarted(true);
  }
  return (
    <div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export function NewGame({
  setDiceValue,
  setLiveDiceScore,
  setPossibleRollScore,
  setCurrentRoundScore,
  setTotalScore,
  setFarkle,
}: newGameProps) {
  function newGame() {
    setDiceValue(allNewDice());
    setLiveDiceScore(0);
    setPossibleRollScore(0);
    setCurrentRoundScore(0);
    setTotalScore(0);
    setFarkle(false);
  }
  return (
    <div>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}
