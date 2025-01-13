//want to make a modal that will show whenever a player gets a Farkle!  This will explain that they farkled and their turn is over and they lost X amount of points
//I want to make it a modal so it takes the screen and shows them that they done messed up.
//The modal will also have a button to end the turn and set their current TURN points to 0.

import React from "react";
import Modal from "../components/Modal";
import { LiveDice, HeldDice, DiceValue } from "../components/Dice";

type farkleProps = {
  points: number;
  rollDice: () => void;
  diceValue: DiceValue;
  setDiceValue: React.Dispatch<
    React.SetStateAction<
      { value: number; held: boolean; previouslyHeld: boolean; id: string }[]
    >
  >;
  setLiveDiceScore: React.Dispatch<React.SetStateAction<number>>;
  setPossibleRollScore: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRoundScore: React.Dispatch<React.SetStateAction<number>>;
  farkle: boolean;
  setFarkle: React.Dispatch<React.SetStateAction<boolean>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FarkleModal({
  points,
  rollDice,
  diceValue,
  setDiceValue,
  setLiveDiceScore,
  setPossibleRollScore,
  setCurrentRoundScore,
  farkle,
  setFarkle,
  setGameStarted,
}: farkleProps) {
  const [open, setOpen] = React.useState(farkle);
  const handleClick = () => {
    setOpen(false);
    rollDice();
    setDiceValue((dice) =>
      dice.map((die) => ({ ...die, held: false, previouslyHeld: false }))
    );
    setLiveDiceScore(0);
    setPossibleRollScore(0);
    setCurrentRoundScore(0);
    setFarkle(false);
    setGameStarted(true);
  };
  return (
    <Modal open={open} handleClickClose={() => {}}>
      <h1 className="font-extrabold text-3xl underline text-black text-center">
        Farkle!
      </h1>
      <div className="flex flex-col text-black items-center gap-5">
        <div>You Farkled! You lost {points} points this round!</div>
        You just rolled:
        <LiveDice diceValue={diceValue} holdDie={() => {}} />
        You had these dice held:
        <HeldDice diceValue={diceValue} holdDie={() => {}} />
        <button
          onClick={handleClick}
          className="border-2 text-black border-black p-1 rounded-lg hover:bg-black hover:text-white hover:scale-110 tracking-wider ml-2 "
        >
          End Turn
        </button>
      </div>
    </Modal>
  );
}
