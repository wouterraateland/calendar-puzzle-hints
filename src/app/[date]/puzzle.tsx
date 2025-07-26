"use client";

import clsx from "clsx";
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
        className="box-content grid select-none grid-cols-9 grid-rows-6 rounded-[2.2em] border-[1.8em] border-neutral-500 p-[0.1em] text-center ring-offset-0"
        style={{ width: "18em", height: "12em", fontSize: "3vmin" }}
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
                      }).format(new Date(`2025-09-${cell.value + 14}`))
                    : ""}
            </div>
          )),
        )}
        {solution.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x},${y}`}
              className={clsx({
                "mt-[0.1em]": solution[y - 1]?.[x] !== cell,
                "mr-[0.1em]": solution[y]?.[x + 1] !== cell,
                "mb-[0.1em]": solution[y + 1]?.[x] !== cell,
                "ml-[0.1em]": solution[y]?.[x - 1] !== cell,
                "rounded-tl-[0.2em]":
                  solution[y]?.[x - 1] !== cell &&
                  solution[y - 1]?.[x] !== cell,
                "rounded-tr-[0.2em]":
                  solution[y]?.[x + 1] !== cell &&
                  solution[y - 1]?.[x] !== cell,
                "rounded-bl-[0.2em]":
                  solution[y]?.[x - 1] !== cell &&
                  solution[y + 1]?.[x] !== cell,
                "rounded-br-[0.2em]":
                  solution[y]?.[x + 1] !== cell &&
                  solution[y + 1]?.[x] !== cell,
                "rounded-tl-[0.1em]":
                  solution[y]?.[x - 1] === cell &&
                  solution[y - 1]?.[x] === cell &&
                  solution[y - 1]?.[x - 1] !== cell,
                "rounded-tr-[0.1em]":
                  solution[y]?.[x + 1] === cell &&
                  solution[y - 1]?.[x] === cell &&
                  solution[y - 1]?.[x + 1] !== cell,
                "rounded-bl-[0.1em]":
                  solution[y]?.[x - 1] === cell &&
                  solution[y + 1]?.[x] === cell &&
                  solution[y + 1]?.[x - 1] !== cell,
                "rounded-br-[0.1em]":
                  solution[y]?.[x + 1] === cell &&
                  solution[y + 1]?.[x] === cell &&
                  solution[y + 1]?.[x + 1] !== cell,
                "bg-neutral-500": cell === V,
                "bg-white mix-blend-difference": cell === E,
                "bg-blue-500":
                  cell !== 0 && cell !== E && cell !== V && hints >= cell,
              })}
              style={{ gridColumnStart: x + 1, gridRowStart: y + 1 }}
            />
          )),
        )}
      </div>
      {solved ? (
        <div className="flex select-none items-center gap-4">
          <p>Hints: {`${hints}`.padStart(2, "0")}</p>
          <div className="flex gap-1">
            <button
              className="flex size-6 touch-manipulation items-center justify-center rounded-md bg-white text-black hover:bg-gray-200 disabled:pointer-events-none disabled:bg-neutral-500"
              disabled={hints <= 0}
              onClick={() => {
                setHints((h) => Math.max(0, h - 1));
              }}
              type="button"
            >
              -
            </button>
            <button
              className="flex size-6 touch-manipulation items-center justify-center rounded-md bg-white text-black hover:bg-gray-200 disabled:pointer-events-none disabled:bg-neutral-500"
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
        <div className="select-none rounded-md bg-white px-4 py-2 text-black">
          Solving...
        </div>
      ) : (
        <button
          className="touch-manipulation select-none rounded-md bg-white px-4 py-2 text-black hover:bg-gray-200"
          onClick={(event) => {
            event.currentTarget.disabled = true;
            setSolving(true);
            setTimeout(() => {
              const randomPieces = pieces
                .sort(() => Math.random() - 0.5)
                .map((piece, i) => ({ ...piece, i: i + 1 }));
              setSolution(solve(generateBoard(date), randomPieces));
              setSolving(false);
            }, 30);
          }}
          type="button"
        >
          Solve
        </button>
      )}
    </>
  );
}
