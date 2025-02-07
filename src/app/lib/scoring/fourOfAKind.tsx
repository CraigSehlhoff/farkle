//I want to set the scoring for four of a kind.  unlike 3 of a kind the score is always 1,000 for 4 of a kind
//I have to make sure that there are exactly 4 of the same die and that they are not held nor previously held.  I will then return the score

import { DiceValue } from "../../components/Dice";
import { initializeCounts } from "./initializeCounts";

export function fourOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const fourOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 4 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 4
  );

  if (fourOfAKindValue > 0) {
    diceValue.forEach((die) => {
      if (die.value === fourOfAKindValue && !die.held && !die.previouslyHeld)
        die.canBeHeld = true;
    });
    return 1000;
  }

  return 0;
}

export function heldFourOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const heldFourOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 4 &&
      diceValue.filter((die) => die.value === index && die.held).length === 4
  );

  if (heldFourOfAKindValue > 0) {
    return 1000;
  }

  return 0;
}
