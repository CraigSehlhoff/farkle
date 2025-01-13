"use client";
import React from "react";
import Modal from "../components/Modal";

export default function Rules() {
  const [open, setOpen] = React.useState(false);

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        padding: 30,
        margin: "auto",
      }}
    >
      <button type="button" onClick={handleClickOpen}>
        Rules/Scoring
      </button>
      <Modal open={open} handleClickClose={handleClickClose}>
        <div className="bg-slate-100 text-black">
          <h1 className="font-extrabold text-black text-3xl underline">
            Farkle Rules
          </h1>
          <div className="flex justify-between">
            <div>
              <h2 className="underline font-bold">Rules</h2>
              <ol className="text-left max-w-72  list-disc ">
                <li>Farkle is a Dice Rolling game.</li>
                <li>First player to 10,000 points wins!</li>
                <li>To begin your turn you must roll all 6 dice.</li>
                <li>
                  If you ever have a turn where you have no new scoring dice,
                  you FARKLE!
                </li>
                <li>
                  If and when you FARKLE! your turn is immediately over and you
                  are awarded no points for that turn.
                </li>
                <li>
                  If you have any new dice that score you can hold them and add
                  their score to your current turn score.
                </li>
                <li>
                  If you ever have all 6 dice held you MUST roll all 6 again,
                  the previous score will count towards the total turn score.
                </li>
                <li>
                  In order to enter the game a player must first earn 500 points
                  before adding any of their points to their total score. After
                  this has been reached you can stop rolling at any time, as
                  long as you did not FARKLE!
                </li>
              </ol>
            </div>
            <div>
              <h2 className="underline font-bold">Scoring</h2>
              <ol className="text-left border-l-8 border-double border-black pl-10 max-w-72 list-disc">
                <li>One 1 = 100 points</li>
                <li>One 5 = 50 points</li>
                <li>Three 1&apos;s = 300 points</li>
                <li>Three 2&apos;s = 200 points</li>
                <li>Three 3&apos;s = 300 points</li>
                <li>Three 4&apos;s = 400 points</li>
                <li>Three 5&apos;s = 500 points</li>
                <li>Three 6&apos;s = 600 points</li>
                <li>Four of a kind = 1000 points</li>
                <li>Five of a kind = 2000 points</li>
                <li>Six of a kind = 3000 points</li>
                <li>Straight (1-6) = 1500 points</li>
                <li>Three pairs = 1500 points</li>
                <li>Four of a kind + a pair = 1500 points</li>
                <li>Two triplets = 2500 points</li>
                <li className="font-semibold">
                  **You can not combine held dice with new dice to make better
                  combinations. For example if you are holding two 5&apos;s and
                  roll another two 5&apos;s that would only be worth 200 points
                  total and not count as 4 of a kind.**
                </li>
              </ol>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClickClose}
            className="border-2 border-black p-1 rounded-lg hover:bg-black hover:text-white hover:scale-110 tracking-wider ml-2"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
