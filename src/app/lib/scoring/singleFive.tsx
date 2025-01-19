//I want to set the scoring for a single five rolled.  1 five = 50 points
//I have to check if any die is a five and if it is, I have to add 50 points to the score unless there are 3 or more fives rolled.
//If there are 3 or more fives rolled I will put that logic in another function/component.
//!I decided to try and put the 3 of a kind logic for fives in here afterall...I keep getting weird issues where the game is claiming a farkle state with a 3 of a kind on either ones or fives

import { DiceValue } from "../../components/Dice";

export function singleFive(diceValue: DiceValue) {
  const score = 0;

  let newScore = score;
  const fives = diceValue.filter(
    (die) => die.value === 5 && !die.held && !die.previouslyHeld
  );

  if (fives.length >= 1 && fives.length < 3) {
    diceValue.forEach((die) => {
      if (die.value === 5) {
        die.canBeHeld = true;
      }
    });
    newScore = fives.length * 50;
  }
  if (fives.length === 3) {
    diceValue.forEach((die) => {
      if (die.value === 5) {
        die.canBeHeld = true;
      }
    });
    newScore = 500;
  }
  return newScore;
}

export function heldSingleFive(diceValue: DiceValue) {
  const score = 0;

  let newScore = score;
  const fives = diceValue.filter(
    (die) => die.value === 5 && die.held && !die.previouslyHeld
  );

  if (fives.length >= 1 && fives.length < 3) {
    newScore = fives.length * 50;
  }
  if (fives.length >= 3) {
    newScore = 0;
  }
  return newScore;
}
