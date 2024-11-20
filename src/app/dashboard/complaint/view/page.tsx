import { getComplaintDetail } from "@/app/actions";
import ComplaintView from "@/components/ComplaintView";
import { redirect } from "next/navigation";

export default async function ComplaintViewPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  if (!searchParams.id) {
    redirect("/dashboard");
  }

  const actionRes = await getComplaintDetail(searchParams.id);

  if (!actionRes.data) {
    redirect("/dashboard");
  }

  return <ComplaintView data={actionRes.data} />;
}
