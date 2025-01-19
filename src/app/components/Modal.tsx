"use client";
import React from "react";

type modalProps = {
  open: boolean;
  handleClickClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, handleClickClose, children }: modalProps) => {
  if (!open) return null;

  return (
    <div
      onClick={handleClickClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.97,
      }}
    >
      <div
        style={{
          // height: 500,
          // width: auto,
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
          overflow: "auto",
        }}
        className="bg-slate-100"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
