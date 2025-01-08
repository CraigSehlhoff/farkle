//I want to set the scoring for a single one rolled.  One 1 = 100 points
//I have to check if any die is a 1 and if it is, I have to add 100 points to the score unless there are 3 or more 1's rolled.
//If there are 3 or more 1s rolled I will put that logic in another function/component.

import { DiceValue } from "../../components/dice";

export function singleOne(diceValue: DiceValue) {
  const score = 0;
  let newScore = score;
  const ones = diceValue.filter(
    (die) => die.value === 1 && !die.held && !die.previouslyHeld
  );

  if (ones.length >= 1 || ones.length < 3) {
    newScore = ones.length * 100;
  }
  if (ones.length >= 3) {
    newScore = 0;
  }
  return newScore;
}
