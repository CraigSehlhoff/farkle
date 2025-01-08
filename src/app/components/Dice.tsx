"use client";
import Image from "next/image";

export const diceImages = [
  "/images/die1.svg",
  "/images/die2.svg",
  "/images/die3.svg",
  "/images/die4.svg",
  "/images/die5.svg",
  "/images/die6.svg",
];

export function newDie() {
  return {
    value: Math.floor(Math.random() * 6) + 1,
    held: false,
    previouslyHeld: false,
    id: Math.random().toString(36).substr(2, 9),
  };
}

export function allNewDice() {
  const newDice = [];
  for (let i = 0; i < 6; i++) {
    newDice.push(newDie());
  }
  return newDice;
}

export type DiceValue = {
  value: number;
  held: boolean;
  previouslyHeld: boolean;
  id: string;
}[];

type LiveDiceProps = {
  diceValue: DiceValue;
  holdDie: (id: string) => void;
};
export function LiveDice({ diceValue, holdDie }: LiveDiceProps) {
  const getDiceImages = diceValue.map((die) => {
    return (
      !die.held &&
      !die.previouslyHeld && (
        <Image
          key={die.id}
          alt={`die-${die.value}`}
          src={`${diceImages[die.value - 1]}`}
          width={100}
          height={100}
          onClick={() => holdDie(die.id)}
        />
      )
    );
  });
  return <div className="flex flex-wrap justify-center">{getDiceImages}</div>;
}

export function HeldDice({ diceValue, holdDie }: LiveDiceProps) {
  const getDiceImages = diceValue.map((die) => {
    return (
      (die.held || die.previouslyHeld) && (
        <Image
          key={die.id}
          alt={`die-${die.value}`}
          src={`${diceImages[die.value - 1]}`}
          width={100}
          height={100}
          onClick={() => holdDie(die.id)}
        />
      )
    );
  });
  return <div className="flex flex-wrap justify-center">{getDiceImages}</div>;
}

export function PreGameDice() {
  const getDiceImages = diceImages.map((image) => {
    return (
      <Image key={image} alt="dice" src={`${image}`} width={100} height={100} />
    );
  });
  return <div className="flex flex-wrap justify-center">{getDiceImages}</div>;
}
