//I want to set the scoring for a single one rolled.  One 1 = 100 points
//I have to check if any die is a 1 and if it is, I have to add 100 points to the score unless there are 3 or more 1's rolled.
//If there are 3 or more 1s rolled I will put that logic in another function/component.
//!I decided to try and put the 3 of a kind logic for ones in here afterall...I keep getting weird issues where the game is claiming a farkle state with a 3 of a kind on either ones or fives

import { DiceValue } from "../../components/Dice";

export function singleOne(diceValue: DiceValue) {
  const score = 0;
  let newScore = score;
  const ones = diceValue.filter(
    (die) => die.value === 1 && !die.held && !die.previouslyHeld
  );

  if (ones.length >= 1 && ones.length < 3) {
    diceValue.forEach((die) => {
      if (die.value === 1) {
        die.canBeHeld = true;
      }
    });
    newScore = ones.length * 100;
  }
  if (ones.length === 3) {
    diceValue.forEach((die) => {
      if (die.value === 1) {
        die.canBeHeld = true;
      }
    });
    newScore = 300;
  }
  return newScore;
}

export function heldSingleOne(diceValue: DiceValue) {
  const score = 0;
  let newScore = score;
  const ones = diceValue.filter(
    (die) => die.value === 1 && die.held && !die.previouslyHeld
  );

  if (ones.length >= 1 && ones.length < 3) {
    newScore = ones.length * 100;
  }
  if (ones.length >= 3) {
    newScore = 0;
  }
  return newScore;
}

//rolling 3 ones the score is not being set as 300 but 0
//rolling 3 ones and 3 fives shows the possible roll score of 50....?
