//multiplayer component...yeah
//So i want to add multiplayer to this. for the moment I am going to keep it completely contained to the app itself and NOT add any kind of backend to this...just within the app and the same browser.  I will eventually try and add a way for people to be able to play this online but not yet.
//how can i do this...
//I can use state to store the player information as well as their score.  Right now I will keep it simple and just have "player 1", "player 2", etc... as the names but eventually could add the ability to change names as well as add some kind of pictures to be used/chosen. I can do this with a an array of objects for the different players
//I also have to be able to determine whos turn it is and how to move from one player to another.  This can be done at the time a player ends their turn/chooses the enter game option.
//I want to be able to display the individual scores for each player and well as still show the each kind of score for the current player as it renders now.
//so lets break it down...further
//create a player state of an array of objects with a name and score.
//need a way to cycle through the players for their turns.  The player turn will end when they choose to end their turn or they farkle.
//need a way to display the scores for each player.
//need a way to display the current player.
//need to change the winning screen to also say the name of the winner.
//need to update the new game function to allow for the number of players to be chosen...from 1-4.  Maybe make a new option on a title screen component
import { useState, useEffect } from "react";

export type Player = {
  name: string;
  score: number;
  id: number;
  enteredGame: boolean;
};

type MultiplayerProps = {
  totalScore: number;
  handleClickEndTurn: () => void;
  currentRoundScore: number;
  numberOfPlayers: number;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  currentPlayer: number;
  setCurrentPlayer: (currentPlayer: number) => void;
};

export function Multiplayer({
  totalScore,
  handleClickEndTurn,
  currentRoundScore,
  numberOfPlayers,
  players,
  setPlayers,
  currentPlayer,
  setCurrentPlayer,
}: MultiplayerProps) {
  useEffect(() => {
    const initialPlayers = Array.from(
      { length: numberOfPlayers },
      (_, index) => ({
        name: `Player ${index + 1}`,
        score: 0,
        id: index,
        enteredGame: false,
      })
    );
    setPlayers(initialPlayers);
  }, [numberOfPlayers]);

  return (
    <div>
      <h1>Multiplayer stuff</h1>
      <p>number of players: {numberOfPlayers}</p>
      <p>current player: {currentPlayer + 1}</p>
      <p>
        current player totalScore:{" "}
        {players.find((player) => player.id === currentPlayer)?.score}
      </p>
    </div>
  );
}
