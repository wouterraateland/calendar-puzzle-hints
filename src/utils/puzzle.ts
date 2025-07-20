export const values: Array<
  Array<
    | { type: "month"; value: number }
    | { type: "date"; value: number }
    | { type: "day"; value: number }
    | { type: "empty" }
  >
> = [
  [
    { type: "month", value: 0 },
    { type: "month", value: 1 },
    { type: "month", value: 2 },
    { type: "month", value: 3 },
    { type: "date", value: 1 },
    { type: "date", value: 2 },
    { type: "date", value: 3 },
    { type: "day", value: 1 },
    { type: "day", value: 2 },
  ],
  [
    { type: "month", value: 4 },
    { type: "date", value: 4 },
    { type: "date", value: 5 },
    { type: "date", value: 6 },
    { type: "date", value: 7 },
    { type: "date", value: 8 },
    { type: "date", value: 9 },
    { type: "day", value: 3 },
    { type: "empty" },
  ],
  [
    { type: "month", value: 5 },
    { type: "date", value: 10 },
    { type: "date", value: 11 },
    { type: "date", value: 12 },
    { type: "date", value: 13 },
    { type: "date", value: 31 },
    { type: "date", value: 15 },
    { type: "day", value: 4 },
    { type: "empty" },
  ],
  [
    { type: "month", value: 6 },
    { type: "date", value: 16 },
    { type: "date", value: 17 },
    { type: "date", value: 18 },
    { type: "date", value: 19 },
    { type: "date", value: 20 },
    { type: "date", value: 21 },
    { type: "day", value: 5 },
    { type: "day", value: 6 },
  ],
  [
    { type: "month", value: 7 },
    { type: "date", value: 22 },
    { type: "date", value: 23 },
    { type: "date", value: 24 },
    { type: "date", value: 25 },
    { type: "date", value: 26 },
    { type: "date", value: 27 },
    { type: "empty" },
    { type: "day", value: 0 },
  ],
  [
    { type: "month", value: 8 },
    { type: "month", value: 9 },
    { type: "month", value: 10 },
    { type: "month", value: 11 },
    { type: "date", value: 28 },
    { type: "date", value: 29 },
    { type: "date", value: 30 },
    { type: "date", value: 14 },
    { type: "empty" },
  ],
];

export type Board = Array<Array<number>>;
export const V = 16;
export const E = 17;
const emptyBoard: Board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, V],
];
const bh = emptyBoard.length;
const bw = emptyBoard[0]!.length;

export const generateBoard = (dateString: string): Board => {
  const d = new Date(dateString);
  const month = d.getMonth();
  const date = d.getDate();
  const day = d.getDay();

  const board = emptyBoard.map((row) => row.slice());
  for (let y = 0; y < bh; y++)
    for (let x = 0; x < bw; x++) {
      const cell = values[y]![x]!;
      if (
        (cell.type === "month" && cell.value === month) ||
        (cell.type === "date" && cell.value === date) ||
        (cell.type === "day" && cell.value === day)
      )
        board[y]![x] = E;
    }

  return board;
};

const pieceConfigurations = [
  { mirror: false, layout: [[1, 1, 1, 1, 1]] },
  {
    mirror: false,
    layout: [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
    ],
  },
  {
    mirror: false,
    layout: [
      [1, 1, 1, 1],
      [0, 1, 0, 0],
    ],
  },
  {
    mirror: false,
    layout: [
      [0, 1, 1, 1],
      [1, 1, 0, 0],
    ],
  },
  {
    mirror: false,
    layout: [
      [1, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    mirror: false,
    layout: [
      [1, 1, 1],
      [1, 0, 1],
    ],
  },
  {
    mirror: false,
    layout: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
  {
    mirror: false,
    layout: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
  },
  {
    mirror: false,
    layout: [
      [0, 0, 1],
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
  {
    mirror: true,
    layout: [
      [0, 1, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
];

type Position = { x: number; y: number };
type RotationMatrix = [[number, number], [number, number]];

const rotationMatrices: Array<RotationMatrix> = [
  [
    [1, 0],
    [0, 1],
  ],
  [
    [0, 1],
    [-1, 0],
  ],
  [
    [-1, 0],
    [0, -1],
  ],
  [
    [0, -1],
    [1, 0],
  ],
];

const positionHash = ({ x, y }: Position) =>
  (1n << (BigInt(y) * BigInt(bw))) << BigInt(x);

export const pieces = pieceConfigurations.map(({ mirror, layout }, i) => {
  const h = layout.length;
  const w = layout[0]?.length ?? 0;
  const basePositions = Array<Position>();
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (layout[y]?.[x]) basePositions.push({ x, y });
  const variants = new Array<Array<Position>>();

  for (const r of i === 0 ? rotationMatrices.slice(0, 2) : rotationMatrices)
    variants.push(
      basePositions.map(({ x, y }) => ({
        x: r[0][0] * x + r[0][1] * y,
        y: r[1][0] * x + r[1][1] * y,
      })),
    );

  if (mirror)
    variants.push(
      ...variants.map((variant) => variant.map(({ x, y }) => ({ x: -x, y }))),
    );

  return {
    i: i + 1,
    variants: variants
      .map((positions) => {
        const xMin = Math.min(...positions.map(({ x }) => x));
        const yMin = Math.min(...positions.map(({ y }) => y));
        return {
          positions: positions.map(({ x, y }) => ({
            x: x - xMin,
            y: y - yMin,
          })),
          w: Math.max(...positions.map(({ x }) => x)) - xMin,
          h: Math.max(...positions.map(({ y }) => y)) - yMin,
        };
      })
      .map(({ w, h, positions }) => ({
        mask: positions.reduce(
          (acc, position) => acc | positionHash(position),
          0n,
        ),
        w,
        h,
      })),
  };
});

type Piece = (typeof pieces)[number];
type Solution = Array<{ i: number; mask: bigint }>;

export const solve = (board: Board, pieces: Array<Piece>) => {
  let boardMask = 0n;
  for (let y = 0; y < bh; y++)
    for (let x = 0; x < bw; x++)
      if (board[y]?.[x]) boardMask |= positionHash({ x, y });

  const todo = [{ boardMask, pieces, solution: [] as Solution }];
  let next:
    | { boardMask: bigint; pieces: Array<Piece>; solution: Solution }
    | undefined;
  while ((next = todo.pop())) {
    const [piece, ...pieces] = next.pieces;
    if (!piece) {
      const res = board.map((row) => row.slice());
      for (const { i, mask } of next.solution)
        for (let y = 0, h = 1n; y < bh; y++)
          for (let x = 0; x < bw; x++, h = h << 1n)
            if (mask & h) res[y]![x] = i;
      return res;
    }
    for (const variant of piece.variants)
      for (let oy = 0, mask = variant.mask; oy < bh; oy++)
        for (let ox = 0; ox < bw; ox++, mask = mask << 1n)
          if (
            ox < bw - variant.w &&
            oy < bh - variant.h &&
            (next.boardMask & mask) === 0n
          )
            todo.push({
              boardMask: next.boardMask | mask,
              pieces,
              solution: next.solution.concat({ i: piece.i, mask }),
            });
  }
  return board;
};
