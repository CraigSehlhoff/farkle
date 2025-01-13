import { singleOne, heldSingleOne } from "./singleOne";
import { singleFive } from "./singleFive";
import { threeOfAKind } from "./threeOfAKind";
import { fourOfAKind } from "./fourOfAKind";
import { fiveOfAKind } from "./fiveOfAKind";
import { sixOfAKind } from "./sixOfAKind";
import { fourAndTwoOfAKind } from "./fourAndTwoOfAKind";
import { threePairs } from "./threePairs";
import { twoTriplets } from "./twoTriplets";
import { straight } from "./straight";
import { DiceValue } from "../../components/dice";

export function allScoring(diceValue: DiceValue) {
  const straightValue = straight(diceValue);
  if (straightValue > 0) {
    return {
      straightValue,
      totalPossibleRollScore: straightValue,
    };
  }
  const fourAndTwoOfAKindValue = fourAndTwoOfAKind(diceValue);
  if (fourAndTwoOfAKindValue > 0) {
    return {
      fourAndTwoOfAKindValue,
      totalPossibleRollScore: fourAndTwoOfAKindValue,
    };
  }
  const threePairsValue = threePairs(diceValue);
  if (threePairsValue > 0) {
    return {
      threePairsValue,
      totalPossibleRollScore: threePairsValue,
    };
  }
  const singleOneValue = singleOne(diceValue);
  const singleFiveValue = singleFive(diceValue);
  const threeOfAKindValue = threeOfAKind(diceValue);
  const fourOfAKindValue = fourOfAKind(diceValue);
  const fiveOfAKindValue = fiveOfAKind(diceValue);
  const sixOfAKindValue = sixOfAKind(diceValue);
  const twoTripletsValue = twoTriplets(diceValue);

  const rollScoreUnderSixDie =
    singleOneValue +
    singleFiveValue +
    threeOfAKindValue +
    fourOfAKindValue +
    fiveOfAKindValue;

  const rollScoreOverSixDie =
    sixOfAKindValue +
    fourAndTwoOfAKindValue +
    threePairsValue +
    twoTripletsValue +
    straightValue;

  const totalPossibleRollScore = rollScoreOverSixDie
    ? rollScoreOverSixDie
    : rollScoreUnderSixDie;

  return {
    rollScoreUnderSixDie,
    rollScoreOverSixDie,
    totalPossibleRollScore,
  };
}

export function heldAllScoring(diceValue: DiceValue) {
  const heldSingleOneValue = heldSingleOne(diceValue);

  return { heldSingleOneValue };
}

//I would like to update the scoring here.  So there seems to be a bit of confusion on my part...I am returning EVERYTHING here for some reason where I could just be importing each thing elsewhere...that kind of defeats the purpose of doing this...
//So what do I need to do...
//lets make a new function, like totalPossibleRollScore, implement it properly and then return that.
//Lets ALSO make sure that any of the potential combinations that contain a 1 or a 5 are scoring properly...at the moment it looks like a straight would still score the 1 and the 5, and the three pairs/four and two of a kind could potentially do that as well
