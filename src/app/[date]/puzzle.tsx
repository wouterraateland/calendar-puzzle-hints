"use client";

import { useState } from "react";
import { E, generateBoard, pieces, solve, V, values } from "utils/puzzle";

export default function Puzzle({ date }: { date: string }) {
  const [solving, setSolving] = useState(false);
  const [solution, setSolution] = useState(() => generateBoard(date));
  const [hints, setHints] = useState(0);
  const solved = solution.every((row) => row.every((cell) => cell !== 0));

  return (
    <>
      <div
        className="grid grid-cols-9 grid-rows-6 text-center ring-[1rem] ring-[#444] ring-offset-0"
        style={{ width: "60vmin", height: "40vmin", fontSize: "3vmin" }}
      >
        {values.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x},${y}`}
              className="self-center"
              style={{ gridColumnStart: x + 1, gridRowStart: y + 1 }}
            >
              {cell.type === "month"
                ? Intl.DateTimeFormat("nl-NL", { month: "short" }).format(
                    new Date(`2025-${`${cell.value + 1}`.padStart(2, "0")}-01`),
                  )
                : cell.type === "date"
                  ? cell.value
                  : cell.type === "day"
                    ? Intl.DateTimeFormat("nl-NL", {
                        weekday: "narrow",
                      }).format(new Date(`2025-09-${cell.value + 7}`))
                    : ""}
            </div>
          )),
        )}
        {solution.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x},${y}`}
              style={{
                background:
                  cell === 0 || cell === E
                    ? "transparent"
                    : cell === V
                      ? "#444"
                      : hints >= cell
                        ? `hsl(${120 - 20 * cell}deg, 75%, ${100 - 9 * cell}%)`
                        : "transparent",
                border: cell === E ? "0.5vmin solid #888" : "none",
                gridColumnStart: x + 1,
                gridRowStart: y + 1,
              }}
            />
          )),
        )}
      </div>
      {solved ? (
        <div className="flex items-center gap-4">
          <p>Hints: {hints}</p>
          <div className="flex gap-1">
            <button
              className="touch-manipulation bg-white px-2 text-black hover:bg-gray-200 disabled:pointer-events-none"
              disabled={hints <= 0}
              onClick={() => {
                setHints((h) => Math.max(0, h - 1));
              }}
              type="button"
            >
              -
            </button>
            <button
              className="touch-manipulation bg-white px-2 text-black hover:bg-gray-200 disabled:pointer-events-none"
              disabled={hints >= 10}
              onClick={() => {
                setHints((h) => Math.min(h + 1, 10));
              }}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      ) : solving ? (
        <div className="bg-white px-2 text-black">Solving...</div>
      ) : (
        <button
          className="touch-manipulation bg-white px-2 text-black hover:bg-gray-200"
          onClick={() => {
            setSolving(true);
            setTimeout(() => {
              const randomPieces = pieces
                .sort(() => Math.random() - 0.5)
                .slice(0, 10);
              setSolution(solve(generateBoard(date), randomPieces));
              setSolving(false);
            });
          }}
          type="button"
        >
          Solve
        </button>
      )}
    </>
  );
}
