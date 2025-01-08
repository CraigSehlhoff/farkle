//I want to set the scoring for five of a kind.  Like a four of a kind a five of a kind has a set value regardless of the dice value.  Which is 2,000 points
//I have to make sure that there are exactly 5 of the same die and that they are not held nor previously held.  I will then return the score.

import { DiceValue } from "../../components/dice";
import { initializeCounts } from "./initializeCounts";

export function fiveOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const fiveOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 5 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 5
  );

  if (fiveOfAKindValue > 0) {
    return 2000;
  }

  return 0;
}
