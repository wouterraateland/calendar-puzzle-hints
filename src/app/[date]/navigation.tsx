import IconCaret from "components/icons/caret";
import { addDays, toDate } from "date-fns";
import Link from "next/link";
import { dateStringify } from "utils/dates";

export default function Navigation({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-1">
      <Link
        className="touch-manipulation opacity-50 transition-opacity hover:opacity-100"
        href={`/${dateStringify(addDays(date, -1))}`}
      >
        <IconCaret direction="left" />
      </Link>
      {Intl.DateTimeFormat().format(toDate(date))}
      <Link
        className="touch-manipulation opacity-50 transition-opacity hover:opacity-100"
        href={`/${dateStringify(addDays(date, 1))}`}
      >
        <IconCaret direction="right" />
      </Link>
    </div>
  );
}
