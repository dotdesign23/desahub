import { CORRESPONDANCE_CONFIG } from "@/configs/correspondance.config";
import Link from "next/link";

export default async function CorrespondancePage() {
  return (
    <>
      <div className="portlet">
        <div className="portlet-header">
          <h3 className="portlet-title text-center">Pilih surat</h3>
        </div>
        <div className="portlet-body">
          <div className="richlist richlist-bordered">
            {Object.values(CORRESPONDANCE_CONFIG).map((correspondance) => (
              <div className="richlist-item" key={correspondance.title}>
                <div className="richlist-content">
                  <h4 className="richlist-title">{correspondance.title}</h4>
                  <p className="richlist-paragraph">
                    {correspondance.description}
                  </p>
                </div>
                <div className="richlist-append">
                  <Link
                    className="btn btn-success btn-wider rounded-pill"
                    href={`/dashboard/correspondance/compose?type=${correspondance.abbr}`}
                  >
                    Pilih
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
