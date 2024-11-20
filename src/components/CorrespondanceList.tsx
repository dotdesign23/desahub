"use client"

import {
  getCorrespondanceList,
  GetCorrespondanceListResponse,
} from "@/app/actions";
import { Swal } from "@/services/swal.service";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import moment from "@/services/moment.service";
import { CORRESPONDANCE_CONFIG } from "@/configs/correspondance.config";

export default function CorrespondanceList() {
  const loadDataDone = useRef<boolean>(false);
  const [data, setData] = useState<GetCorrespondanceListResponse["data"]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);

    try {
      const resQuery = await getCorrespondanceList();

      setData(resQuery?.data);
    } catch (e: unknown) {
      console.error(e);
      Swal.fire(
        "FETCH_ERROR",
        "Terjadi kesalahan saat melakukan pengambilan data",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loadDataDone.current === false) {
      loadData();
    }

    return () => {
      loadDataDone.current = true;
    };
  }, [loadDataDone]);

  return (
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
        {isLoading ? (
          <div className="vstack align-items-center">
            <span className="spinner-border text-primary"></span>
          </div>
        ) : data && data.length > 0 ? (
          <div className="richlist richlist-bordered">
            {data.map((correspondance) => (
              <div className="richlist-item" key={correspondance.id}>
                <div className="richlist-content">
                  <h4 className="richlist-title">
                    {CORRESPONDANCE_CONFIG[correspondance.type].title}
                  </h4>
                  <p className="richlist-subtitle">
                    {moment(correspondance.createdAt).fromNow()}
                    {correspondance.status === "SUBMITTED" ? (
                      <span className="badge badge-primary mx-1">Terkirim</span>
                    ) : correspondance.status === "PROCESSED" ? (
                      <span className="badge badge-secondary mx-1">
                        Diproses
                      </span>
                    ) : correspondance.status === "FINISHED" ? (
                      <span className="badge badge-success mx-1">Selesai</span>
                    ) : null}
                  </p>
                </div>
                <div className="richlist-addon">
                  <button className="btn btn-primary btn-wide rounded-pill">
                    Lihat
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-danger text-center mb-0">
            <div className="alert-content">Belum ada data</div>
          </div>
        )}
      </div>
    </div>
  );
}
