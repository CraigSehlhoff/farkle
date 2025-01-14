"use client";
import React from "react";
import Modal from "../components/Modal";

type WinningProps = {
  youWin: boolean;
  setYouWin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Winning({ youWin, setYouWin }: WinningProps) {
  const [open, setOpen] = React.useState(youWin);

  const handleClickClose = () => {
    setOpen(false);
    setYouWin(false);
  };

  return (
    <Modal open={open} handleClickClose={() => {}}>
      <div className="bg-slate-100 text-black">CONGRATS!!! YOU DID IT!!!</div>
      <button onClick={handleClickClose}>Back</button>
    </Modal>
  );
}
