"use client";
import { allNewDice, DiceValue } from "./Dice";
import { Player } from "./Multiplayer";

type newGameProps = {
  setGameStarted: (value: boolean) => void;
  setDiceValue: (value: DiceValue) => void;
  setLiveDiceScore: (value: number) => void;
  setPossibleRollScore: (value: number) => void;
  setCurrentRoundScore: (value: number) => void;
  setPrevRoundScore: (value: number) => void;
  setTotalScore: (value: number) => void;
  setFarkle: (value: boolean) => void;
  rollDice: () => void;
  setYouWin: (value: boolean) => void;
  setNumberOfPlayers: (value: number) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  setCurrentPlayer: (value: number) => void;
};

export function NewGame({
  setGameStarted,
  setDiceValue,
  setLiveDiceScore,
  setPossibleRollScore,
  setCurrentRoundScore,
  setPrevRoundScore,
  setTotalScore,
  setFarkle,
  rollDice,
  setYouWin,
  setNumberOfPlayers,
  players,
  setPlayers,
  setCurrentPlayer,
}: newGameProps) {
  function newGame() {
    setGameStarted(false);
    setGameStarted(true);
    setDiceValue(allNewDice());
    rollDice();
    setPrevRoundScore(0);
    setLiveDiceScore(0);
    setPossibleRollScore(0);
    setCurrentRoundScore(0);
    setTotalScore(0);
    setFarkle(false);
    setYouWin(false);
  }

  function onePlayer() {
    setNumberOfPlayers(1);
    setPlayers(
      players.map((player) => ({ ...player, enteredGame: false, score: 0 }))
    );
    newGame();
  }

  function twoPlayers() {
    setNumberOfPlayers(2);
    setPlayers(
      players.map((player) => ({ ...player, enteredGame: false, score: 0 }))
    );
    setCurrentPlayer(0);
    newGame();
  }

  // function threePlayers() {
  //   setNumberOfPlayers(3);
  //   newGame();
  // }

  // function fourPlayers() {
  //   setNumberOfPlayers(4);
  //   newGame();
  // }

  //when you click on the new game multiplayer button I would like for the player to choose how many players will be in the game.
  return (
    <div className="flex justify-center flex-col gap-4">
      <button
        className="border-2 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:scale-110 tracking-wider ml-auto mr-auto"
        onClick={onePlayer}
      >
        New Game - 1 Player
      </button>
      <button
        className="border-2 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:scale-110 tracking-wider ml-auto mr-auto"
        onClick={twoPlayers}
      >
        New Game - 2 players
      </button>{" "}
      {/* <button
        className="border-2 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:scale-110 tracking-wider ml-auto mr-auto"
        onClick={threePlayers}
      >
        New Game - 3 players
      </button>{" "}
      <button
        className="border-2 border-white p-1 rounded-lg hover:bg-white hover:text-black hover:scale-110 tracking-wider ml-auto mr-auto"
        onClick={fourPlayers}
      >
        New Game - 4 players
      </button> */}
    </div>
  );
}
