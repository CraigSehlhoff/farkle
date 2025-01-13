//I want to set the scoring for when you roll two sets of triplets.  This can only happen on the same roll, not if you have a triplet held and then roll another.
//I have to make sure that there are exactly two sets of 3 of a kind and that they are not held nor previously held.  I will then return a score of 2,500
//This will be VERY close to the threePairs function but instead of checking for two of a kind three times, I will check for three of a kind twice.

import { DiceValue } from "../../components/dice";
import { initializeCounts } from "./initializeCounts";

export function twoTriplets(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  let tripletsCount = 0;

  counts.forEach((count, index) => {
    if (
      count === 3 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 3
    ) {
      tripletsCount++;
    }
  });

  if (tripletsCount === 2) {
    return 2500;
  }

  return 0;
}
