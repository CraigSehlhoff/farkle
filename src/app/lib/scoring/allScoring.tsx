import { singleOne } from "./singleOne";
import { singleFive } from "./singleFive";
import { threeOfAKind } from "./threeOfAKind";
import { fourOfAKind } from "./fourOfAKind";
import { fiveOfAKind } from "./fiveOfAKind";
import { sixOfAKind } from "./sixOfAKind";
import { DiceValue } from "../../components/dice";

export function allScoring(diceValue: DiceValue) {
  const singleOneValue = singleOne(diceValue);
  const singleFiveValue = singleFive(diceValue);
  const threeOfAKindValue = threeOfAKind(diceValue);
  const fourOfAKindValue = fourOfAKind(diceValue);
  const fiveOfAKindValue = fiveOfAKind(diceValue);
  const sixOfAKindValue = sixOfAKind(diceValue);
  const totalPossibleRollScore =
    singleOneValue + singleFiveValue + threeOfAKindValue + fourOfAKindValue;

  return {
    singleOneValue,
    singleFiveValue,
    threeOfAKindValue,
    fourOfAKindValue,
    fiveOfAKindValue,
    sixOfAKindValue,
    totalPossibleRollScore,
  };
}
