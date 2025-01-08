import { singleOne } from "./singleOne";
import { singleFive } from "./singleFive";
import { DiceValue } from "../../components/dice";

export function allScoring(diceValue: DiceValue) {
  const singleOneValue = singleOne(diceValue);
  const singleFiveValue = singleFive(diceValue);
  const totalPossibleRollScore = singleOneValue + singleFiveValue;
  return { singleOneValue, singleFiveValue, totalPossibleRollScore };
}
