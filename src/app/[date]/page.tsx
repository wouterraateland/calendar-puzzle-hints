import Navigation from "app/[date]/navigation";
import Puzzle from "app/[date]/puzzle";
import Link from "next/link";
import { dateParse } from "utils/dates";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  if (dateParse(date) === null)
    return (
      <html>
        <body className="flex h-[100dvh] flex-col items-center justify-center gap-8 bg-black font-mono text-white">
          <h1 className="text-2xl text-white">Invalid date</h1>
          <Link href={`/${new Date().toISOString().split("T")[0]}`}>
            <button className="bg-white px-4 py-2 text-black">
              Go to today
            </button>
          </Link>
        </body>
      </html>
    );

  return (
    <html>
      <body className="flex h-[100dvh] flex-col items-center justify-center gap-8 bg-black font-mono text-white">
        <Navigation date={date} />
        <Puzzle date={date} />
      </body>
    </html>
  );
}
