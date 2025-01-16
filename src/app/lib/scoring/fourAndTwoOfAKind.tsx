//I want to set the scoring for when you have four of a kind and two of a kind on the same roll.  This can only happen on the same roll, not if you have a pair or four of a kind held and then roll the other.
//I have to make sure that there is exactly 4 of the same die and 2 of the same die and that they are not held nor previously held.  I will then return the score of 1,500

import { DiceValue } from "../../components/Dice";
import { initializeCounts } from "./initializeCounts";

export function fourAndTwoOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const fourOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 4 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 4
  );

  const twoOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 2 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 2
  );

  if (fourOfAKindValue > 0 && twoOfAKindValue > 0) {
    diceValue.forEach((die) => {
      if (
        (die.value === fourOfAKindValue || die.value === twoOfAKindValue) &&
        !die.held &&
        !die.previouslyHeld
      )
        die.canBeHeld = true;
    });
    return 1500;
  }

  return 0;
}

export function heldFourAndTwoOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const heldFourOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 4 &&
      diceValue.filter((die) => die.value === index && die.held).length === 4
  );

  const heldTwoOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 2 &&
      diceValue.filter((die) => die.value === index && die.held).length === 2
  );

  if (heldFourOfAKindValue > 0 && heldTwoOfAKindValue > 0) {
    return 1500;
  }
  return 0;
}
