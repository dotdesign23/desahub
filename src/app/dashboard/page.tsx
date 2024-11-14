import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <div className="portlet">
        <div className="portlet-header">
          <h3 className="portlet-title">Surat diajukan</h3>
          <div className="portlet-addon">
            <Link
              href="/dashboard/correspondance"
              className="btn btn-success btn-widest rounded-pill"
            >
              Ajukan
            </Link>
          </div>
        </div>
        <div className="portlet-body">
          <div className="richlist richlist-bordered">
            <div className="richlist-item">
              <div className="richlist-content">
                <h4 className="richlist-title">Surat Keterangan Domisili</h4>
                <p className="richlist-subtitle">
                  2 hari lalu{" "}
                  <span className="badge badge-success mx-1">Selesai</span>
                </p>
              </div>
              <div className="richlist-addon">
                <button className="btn btn-primary btn-wide rounded-pill">
                  Lihat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="portlet">
        <div className="portlet-header">
          <h3 className="portlet-title">Daftar pengaduan</h3>
          <div className="portlet-addon">
            <Link
              href="/dashboard/report"
              className="btn btn-success btn-widest rounded-pill"
            >
              Adukan
            </Link>
          </div>
        </div>
        <div className="portlet-body">
          <div className="richlist richlist-bordered">
            <div className="richlist-item">
              <div className="richlist-content">
                <h4 className="richlist-title">Kerusakan fasilitas</h4>
                <p className="richlist-subtitle">
                  2 hari lalu{" "}
                  <span className="badge badge-success mx-1">Ditanggapi</span>
                </p>
              </div>
              <div className="richlist-addon">
                <button className="btn btn-primary btn-wide rounded-pill">
                  Lihat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
