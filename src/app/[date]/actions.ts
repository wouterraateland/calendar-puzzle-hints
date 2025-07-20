"use server";

import type { Board } from "utils/puzzle";
import { generateBoard, pieces, solve } from "utils/puzzle";
import { redis } from "utils/redis";

export const solveForDate = async (date: string) => {
  const storedSolution = await redis.get<Board>(`date-puzzle-solution:${date}`);
  if (storedSolution) return storedSolution;

  const board = generateBoard(date);
  const randomPieces = pieces.sort(() => Math.random() - 0.5).slice(0, 10);

  const tStart = Date.now();
  const solution = solve(board, randomPieces);
  console.log(`Solving took ${Date.now() - tStart}ms`);

  await redis.set(`date-puzzle-solution:${date}`, solution);

  return solution;
};
