import IconCaret from "components/icons/caret";
import Link from "next/link";
import { dateStringify } from "utils/dates";

export default function Navigation({ date }: { date: string }) {
  const current = new Date(date);
  const next = new Date(current);
  next.setDate(current.getDate() + 1);
  const prev = new Date(current);
  prev.setDate(current.getDate() - 1);
  return (
    <div className="flex select-none items-center gap-1">
      <Link
        className="touch-manipulation opacity-50 transition-opacity hover:opacity-100"
        href={`/${dateStringify(prev)}`}
      >
        <IconCaret direction="left" />
      </Link>
      {Intl.DateTimeFormat("nl-NL").format(current)}
      <Link
        className="touch-manipulation opacity-50 transition-opacity hover:opacity-100"
        href={`/${dateStringify(next)}`}
      >
        <IconCaret direction="right" />
      </Link>
    </div>
  );
}
