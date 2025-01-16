import { DiceValue } from "../../components/Dice";
import { initializeCounts } from "./initializeCounts";

export function sixOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const sixOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 6 &&
      diceValue.filter(
        (die) => die.value === index && !die.held && !die.previouslyHeld
      ).length === 6
  );

  if (sixOfAKindValue > 0) {
    diceValue.forEach((die) => {
      if (die.value === sixOfAKindValue && !die.held && !die.previouslyHeld) {
        die.canBeHeld = true;
      }
    });
    return 3000;
  }

  return 0;
}

export function heldSixOfAKind(diceValue: DiceValue) {
  const { counts, isEmpty } = initializeCounts(diceValue);
  if (isEmpty) return 0;

  const heldSixOfAKindValue = counts.findIndex(
    (count, index) =>
      count === 6 &&
      diceValue.filter((die) => die.value === index && die.held).length === 6
  );

  if (heldSixOfAKindValue > 0) {
    return 3000;
  }

  return 0;
}
