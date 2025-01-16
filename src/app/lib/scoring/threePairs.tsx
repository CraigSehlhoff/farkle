//I want to set the scoring for when you roll 3 pairs at one time.  This can only happen on the same roll, not if you have a pair held and then roll two more.
//I have to make sure that there are exactly 3 pairs and that they are not held nor previously held.  I will then return the score of 1,500
//This should be very similar to the fourAndTwoOfAKind function but instead check for two of a kind three times.

import { DiceValue } from "../../components/Dice";
import { initializeCounts } from "./initializeCounts";

export function threePairs(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  let pairsCount = 0;

  counts.forEach((count, index) => {
    if (
      count === 2 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 2
    ) {
      pairsCount++;
    }
  });

  if (pairsCount === 3) {
    diceValue.forEach((die) => {
      if (!die.held && !die.previouslyHeld) die.canBeHeld = true;
    });
    return 1500;
  }

  return 0;
}

export function heldThreePairs(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  let heldPairsCount = 0;

  counts.forEach((count, index) => {
    if (
      count === 2 &&
      diceValue.filter(
        (die) => die.value === index && die.held && !die.previouslyHeld
      ).length === 2
    ) {
      heldPairsCount++;
    }
  });

  if (heldPairsCount === 3) {
    return 1500;
  }

  return 0;
}
