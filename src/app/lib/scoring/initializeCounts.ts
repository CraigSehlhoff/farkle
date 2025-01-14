import { DiceValue } from "../../components/Dice";

export function initializeCounts(diceValue: DiceValue) {
  if (!diceValue || diceValue.length === 0) {
    return { counts: [], values: [], isEmpty: true };
  }

  const counts = new Array(7).fill(0);
  const values = diceValue.map((d) => d.value);

  values.forEach((v) => counts[v]++);

  return { counts, values, isEmpty: false };
}
