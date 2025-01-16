//I want to set the scoring of three of a kind.  Three of a kind is = to 100x the dice value, with the exception of 1s, where three 1s = 300 points!
//I have to check if there are exactly three of a dice value that are live and not held nor previously held.
//after checking their held states I will then add/return the score

import { DiceValue } from "../../components/Dice";
import { initializeCounts } from "./initializeCounts";

export function threeOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const threeOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 3 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 3
  );

  if (threeOfAKindValue > 0) {
    diceValue.forEach((die) => {
      if (die.value === threeOfAKindValue && !die.held && !die.previouslyHeld)
        die.canBeHeld = true;
    });
    return threeOfAKindValue === 1 || threeOfAKindValue === 5
      ? 0
      : threeOfAKindValue * 100;
  }

  return 0;
}

export function heldThreeOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const heldThreeOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 3 &&
      diceValue.filter((die) => die.value === index && die.held).length === 3
  );

  if (heldThreeOfAKindValue > 0) {
    return heldThreeOfAKindValue === 1 ? 300 : heldThreeOfAKindValue * 100;
  }

  return 0;
}
