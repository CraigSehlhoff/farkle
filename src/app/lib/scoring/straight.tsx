//I want to set the scoring for when you roll a full straight of 1-6.  This can only happen on the same roll, not if you have a straight held and then roll the remaining die.
//I'm thinking im going to check the value and count of each die and have them all set to 1 and then check to see if that happens 6 times and then return the score of 1,500.  I also have to make sure that none of the die are held nor previously held.

import { DiceValue } from "../../components/dice";
import { initializeCounts } from "./initializeCounts";

export function straight(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  let singleDieCount = 0;

  counts.forEach((count, index) => {
    if (
      count === 1 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 1
    ) {
      singleDieCount++;
    }
  });

  if (singleDieCount === 6) {
    return 1500;
  }
  return 0;
}
