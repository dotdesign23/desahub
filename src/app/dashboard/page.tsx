import LogoutForm from "@/components/LogoutForm";
import { AUTH_CONFIG } from "@/configs/auth.config";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(AUTH_CONFIG);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="vstack text-center gap-2 my-5">
            <h1>Selamat Datang</h1>
            <h2>{session?.user?.name}</h2>
          </div>
          <div className="portlet">
            <div className="portlet-header">
              <h3 className="portlet-title">Surat diajukan</h3>
              <div className="portlet-addon">
                <button className="btn btn-success btn-widest rounded-pill">
                  Ajukan
                </button>
              </div>
            </div>
            <div className="portlet-body">
              <div className="richlist richlist-bordered">
                <div className="richlist-item">
                  <div className="richlist-content">
                    <h4 className="richlist-title">
                      Surat Keterangan Domisili
                    </h4>
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
                <button className="btn btn-success btn-widest rounded-pill">
                  Adukan
                </button>
              </div>
            </div>
            <div className="portlet-body">
              <div className="richlist richlist-bordered">
                <div className="richlist-item">
                  <div className="richlist-content">
                    <h4 className="richlist-title">Kerusakan fasilitas</h4>
                    <p className="richlist-subtitle">
                      2 hari lalu{" "}
                      <span className="badge badge-success mx-1">
                        Ditanggapi
                      </span>
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
          <LogoutForm />
        </div>
      </div>
    </div>
  );
}
