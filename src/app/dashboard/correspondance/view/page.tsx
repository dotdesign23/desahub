import { getCorrespondanceDetail } from "@/app/actions";
import { CORRESPONDANCE_CONFIG } from "@/configs/correspondance.config";
import { redirect } from "next/navigation";
import CorrespondanceSKDView from "@/components/CorrespondanceSKDView";
import CorrespondanceSKKView from "@/components/CorrespondanceSKKView";
import CorrespondanceSKTMView from "@/components/CorrespondanceSKTMView";
import CorrespondanceSKUView from "@/components/CorrespondanceSKUView";
import CorrespondanceCancelForm from "@/components/CorrespondanceCancelForm";
import moment from "@/services/moment.service";

export default async function CorrespondanceView({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  if (!searchParams.id) {
    redirect("/dashboard");
  }

  const actionRes = await getCorrespondanceDetail(searchParams.id);

  if (!actionRes.data) {
    redirect("/dashboard");
  }

  const correspondance = actionRes.data;
  const correspondanceContent = correspondance.content as Record<
    string,
    string
  >;

  console.log(correspondanceContent);
  

  return (
    <div className="portlet">
      <div className="portlet-header">
        <h3 className="portlet-title text-center">
          {CORRESPONDANCE_CONFIG[correspondance.type].title}
        </h3>
      </div>
      <div className="portlet-body">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th colSpan={2} className="text-center">
                Informasi Surat
              </th>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                {correspondance.status === "SUBMITTED" ? (
                  <span className="badge badge-primary">Diajukan</span>
                ) : correspondance.status === "PROCESSED" ? (
                  <span className="badge badge-secondary">Diproses</span>
                ) : correspondance.status === "FINISHED" ? (
                  <span className="badge badge-success">Selesai</span>
                ) : correspondance.status === "CANCELED" ? (
                  <span className="badge badge-danger">Dibatalkan</span>
                ) : null}
              </td>
            </tr>
            <tr>
              <th>Tanggal Pengajuan</th>
              <td>{moment(correspondance.createdAt).format("DD-MM-YYYY")}</td>
            </tr>
            <tr>
              <th>Kontak</th>
              <td>{correspondanceContent.whatsappContact}</td>
            </tr>
            <tr>
              <th colSpan={2} className="text-center">
                Konten Surat
              </th>
            </tr>
            {correspondance.type === "SURAT_KETERANGAN_DOMISILI" ? (
              <CorrespondanceSKDView content={correspondanceContent} />
            ) : correspondance.type === "SURAT_KETERANGAN_KEMATIAN" ? (
              <CorrespondanceSKKView content={correspondanceContent} />
            ) : correspondance.type === "SURAT_KETERANGAN_TIDAK_MAMPU" ? (
              <CorrespondanceSKTMView content={correspondanceContent} />
            ) : correspondance.type === "SURAT_KETERANGAN_USAHA" ? (
              <CorrespondanceSKUView content={correspondanceContent} />
            ) : null}
          </tbody>
        </table>
        {correspondance.status !== "CANCELED" ? (
          <CorrespondanceCancelForm correspondanceId={correspondance.id} />
        ) : null}
      </div>
    </div>
  );
}
