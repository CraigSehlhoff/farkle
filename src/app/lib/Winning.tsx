"use client";
import React from "react";
import Modal from "../components/Modal";
import Confetti from "react-confetti";
import { Bangers } from "next/font/google";
import { DiceValue, allNewDice } from "../components/Dice";
import { Player } from "../components/Multiplayer";

const bangersFont = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

type WinningProps = {
  youWin: boolean;
  setYouWin: React.Dispatch<React.SetStateAction<boolean>>;
  totalScore: number;
  setGameStarted: (value: boolean) => void;
  setDiceValue: (value: DiceValue) => void;
  setLiveDiceScore: (value: number) => void;
  setPossibleRollScore: (value: number) => void;
  setCurrentRoundScore: (value: number) => void;
  setPrevRoundScore: (value: number) => void;
  setTotalScore: (value: number) => void;
  setFarkle: (value: boolean) => void;
  rollDice: () => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  currentPlayer: number;
};

export default function Winning({
  youWin,
  setYouWin,
  totalScore,
  setGameStarted,
  setDiceValue,
  setLiveDiceScore,
  setPossibleRollScore,
  setCurrentRoundScore,
  setPrevRoundScore,
  setTotalScore,
  setFarkle,
  rollDice,
  players,
  setPlayers,
  currentPlayer,
}: WinningProps) {
  const [open, setOpen] = React.useState(youWin);

  const handleClickClose = () => {
    setOpen(false);
    setYouWin(false);
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
    setPlayers(
      players.map((player) => ({ ...player, enteredGame: false, score: 0 }))
    );
  };

  return (
    <Modal open={open} handleClickClose={() => {}}>
      <div className="flex flex-col text-black items-center flex-wrap justify-center h-full">
        <div className="mt-auto">
          <div className="text-4xl text-center">
            Congratulations{" "}
            {players.map((player) => {
              if (player.score >= 10000) return player.name;
            })}
            !
          </div>
          <div
            className={`${bangersFont.className} bg-slate-100 text-black text-8xl text-center `}
          >
            YOU DID IT!!!
          </div>
          <div className="text-2xl text-center">
            You scored {totalScore} points this game!
          </div>
        </div>
        <div className="mt-auto mb-10">
          <button
            className="border-2 text-black border-black p-1 rounded-lg hover:bg-black hover:text-white hover:scale-110 tracking-wider ml-2"
            onClick={handleClickClose}
          >
            Play Again?
          </button>
        </div>
      </div>
      <Confetti />
    </Modal>
  );
}
