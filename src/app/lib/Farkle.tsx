//want to make a modal that will show whenever a player gets a Farkle!  This will explain that they farkled and their turn is over and they lost X amount of points
//I want to make it a modal so it takes the screen and shows them that they done messed up.
//The modal will also have a button to end the turn and set their current TURN points to 0.

import React from "react";
import Modal from "../components/Modal";
import { LiveDice, HeldDice, DiceValue } from "../components/Dice";
import { Player } from "../components/Multiplayer";

type farkleProps = {
  prevRoundScore: number;
  setPrevRoundScore: React.Dispatch<React.SetStateAction<number>>;
  rollDice: () => void;
  diceValue: DiceValue;
  setDiceValue: React.Dispatch<
    React.SetStateAction<
      {
        value: number;
        held: boolean;
        previouslyHeld: boolean;
        canBeHeld: boolean;
        id: string;
      }[]
    >
  >;
  setLiveDiceScore: React.Dispatch<React.SetStateAction<number>>;
  setPossibleRollScore: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRoundScore: React.Dispatch<React.SetStateAction<number>>;
  farkle: boolean;
  setFarkle: React.Dispatch<React.SetStateAction<boolean>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  endTurnMultiplayer: () => void;
  players: Player[];
  currentPlayer: number;
};

export default function FarkleModal({
  prevRoundScore,
  setPrevRoundScore,
  rollDice,
  diceValue,
  setDiceValue,
  setLiveDiceScore,
  setPossibleRollScore,
  setCurrentRoundScore,
  farkle,
  setFarkle,
  setGameStarted,
  endTurnMultiplayer,
  players,
  currentPlayer,
}: farkleProps) {
  const [open, setOpen] = React.useState(farkle);

  const handleClick = () => {
    setOpen(false);
    setFarkle(false);
    setPossibleRollScore(0);
    setDiceValue((dice) =>
      dice.map((die) => ({
        ...die,
        held: false,
        previouslyHeld: false,
        canBeHeld: false,
      }))
    );
    rollDice();
    setLiveDiceScore(0);
    setCurrentRoundScore(0);
    setGameStarted(true);
    setPrevRoundScore(0);
    endTurnMultiplayer();
  };

  return (
    <Modal open={open} handleClickClose={() => {}}>
      <h1 className="font-extrabold text-3xl underline text-black text-center">
        Farkle!
      </h1>
      <div className="flex flex-col text-black items-center gap-5">
        <div>
          {players.map((player) => {
            if (player.id === currentPlayer) return player.name;
          })}{" "}
          Farkled! They lost {prevRoundScore} potential points this round!
        </div>
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
