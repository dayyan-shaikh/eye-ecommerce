"use client";
 
import React from "react";
import useCanvasCursor from "./CanvasCursor";
 
const CanvasCursor = () => {
  useCanvasCursor();
 
  return (
    <canvas
      className="pointer-events-none fixed inset-0"
      id="canvas"
    />
  );
};
export default CanvasCursor;