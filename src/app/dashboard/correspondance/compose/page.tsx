import CorrespondanceSKDForm from "@/components/CorrespondanceSKDForm";
import CorrespondanceSKKForm from "@/components/CorrespondanceSKKForm";
import CorrespondanceSKTMForm from "@/components/CorrespondanceSKTMForm";
import CorrespondanceSKUForm from "@/components/CorrespondanceSKUForm";
import { CORRESPONDANCE_CONFIG } from "@/configs/correspondance.config";
import { redirect } from "next/navigation";

export default function CorrespondancePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const correspondanceData = Object.values(CORRESPONDANCE_CONFIG).find(
    (correspondance) => correspondance.abbr === searchParams.type
  );

  if (!correspondanceData) {
    return redirect("/dashboard");
  }

  switch (correspondanceData.abbr) {
    case "SKD":
      return <CorrespondanceSKDForm />;
    case "SKK":
      return <CorrespondanceSKKForm />;
    case "SKTM":
      return <CorrespondanceSKTMForm />;
    case "SKU":
      return <CorrespondanceSKUForm />;
    default:
      return redirect("/dashboard");
  }
}
