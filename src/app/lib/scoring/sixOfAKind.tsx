import { DiceValue } from "../../components/dice";
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
    return 3000;
  }

  return 0;
}
