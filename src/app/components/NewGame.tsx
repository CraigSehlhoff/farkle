"use client";
import { allNewDice, DiceValue } from "./Dice";

type newGameProps = {
  setGameStarted: (value: boolean) => void;
  setDiceValue: (value: DiceValue) => void;
  setLiveDiceScore: (value: number) => void;
  setPossibleRollScore: (value: number) => void;
  setCurrentRoundScore: (value: number) => void;
  setPrevRoundScore: (value: number) => void;
  setTotalScore: (value: number) => void;
  setFarkle: (value: boolean) => void;
  rollDice: () => void;
  setEnteredGame: (value: boolean) => void;
  setYouWin: (value: boolean) => void;
};

export function NewGame({
  setGameStarted,
  setDiceValue,
  setLiveDiceScore,
  setPossibleRollScore,
  setCurrentRoundScore,
  setPrevRoundScore,
  setTotalScore,
  setFarkle,
  rollDice,
  setEnteredGame,
  setYouWin,
}: newGameProps) {
  function newGame() {
    setGameStarted(false);
    setGameStarted(true);
    setDiceValue(allNewDice());
    rollDice();
    setPrevRoundScore(0);
    setLiveDiceScore(0);
    setPossibleRollScore(0);
    setCurrentRoundScore(0);
    setTotalScore(0);
    setFarkle(false);
    setEnteredGame(false);
    setYouWin(false);
  }
  return (
    <div className="flex justify-center">
      <button
        className="border-2 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:scale-110 tracking-wider"
        onClick={newGame}
      >
        New Game
      </button>
    </div>
  );
}
