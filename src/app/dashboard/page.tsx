import CorrespondanceList from "@/components/CorrespondanceList";
import ComplainList from "@/components/ComplaintList";
import FAQ from "@/components/FAQ";

export default function DashboardPage() {
  return (
    <>
      <CorrespondanceList />
      <ComplainList />
      <FAQ />
    </>
  );
}
