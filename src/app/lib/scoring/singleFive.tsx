//I want to set the scoring for a single five rolled.  1 five = 50 points
//I have to check if any die is a five and if it is, I have to add 50 points to the score unless there are 3 or more fives rolled.
//If there are 3 or more fives rolled I will put that logic in another function/component.

import { DiceValue } from "../../components/dice";

export function singleFive(diceValue: DiceValue) {
  const score = 0;

  let newScore = score;
  const fives = diceValue.filter(
    (die) => die.value === 5 && !die.held && !die.previouslyHeld
  );

  if (fives.length >= 1 || fives.length < 3) {
    newScore = fives.length * 50;
  }
  if (fives.length >= 3) {
    newScore = 0;
  }
  return newScore;
}
