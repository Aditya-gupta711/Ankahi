import { redirect } from "next/navigation";

export default function LegacyAdminEntryPage() {
  redirect("/admin/login");
}
