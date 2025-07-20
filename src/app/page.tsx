import { redirect } from "next/navigation";

export default function Page() {
  redirect(`/${new Date().toISOString().split("T")[0]}`);
}
