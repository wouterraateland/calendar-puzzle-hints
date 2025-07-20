import { toDate } from "date-fns";

export const dateStringify = (date: Date): string =>
  date.toISOString().split("T")[0] ?? "";

export const dateParse = (dateString: string): Date | null => {
  const date = toDate(dateString);
  if (isNaN(date.getTime())) return null;
  return date;
};
