import { CORRESPONDANCE_CONFIG } from "@/configs/correspondance.config";
import { redirect } from "next/navigation";

export default function CorrespondancePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const correspondanceType = Object.values(CORRESPONDANCE_CONFIG).find(
    (correspondance) => correspondance.abbr === searchParams.type
  );

  if (!correspondanceType) {
    return redirect("/dashboard")
  }

  return (
    <>
      <div className="portlet">
        <div className="portlet-header">
          <h3 className="portlet-title text-center">Ajukan surat</h3>
        </div>
        <div className="portlet-body">
          <form className="vstack gap-3" action="">
            <input
              type="text"
              className="form-control"
              placeholder="Nama Lengkap"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Tempat Lahir"
            />
            <input
              type="date"
              className="form-control"
              placeholder="Tanggal Lahir"
            />
            <select className="form-select" name="" id="">
              <option value="">Jenis Kelamin</option>
              <option value="M">Laki-laki</option>
              <option value="F">Perempuan</option>
            </select>
            <select className="form-select" name="" id="">
              <option value="">Status Perkawinan</option>
              <option value="M">Menikah</option>
              <option value="S">Belum Menikah</option>
            </select>
            <select className="form-select" name="" id="">
              <option value="">Warga Negara</option>
              <option value="WNI">Warga Negara Indonesia</option>
              <option value="WNA">Warga Negara Asing</option>
            </select>
          </form>
        </div>
      </div>
      <div className="portlet">
        <div className="portlet-header">
          <h3 className="portlet-title text-center">Informasi kontak</h3>
        </div>
        <div className="portlet-body">
          <input
            type="tel"
            className="form-control"
            placeholder="Masukkan nomor whatsapp"
          />
        </div>
      </div>
    </>
  );
}
