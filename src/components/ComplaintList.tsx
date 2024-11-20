"use client";

import { getComplaintList, GetComplaintListResponse } from "@/app/actions";
import { Swal } from "@/services/swal.service";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import moment from "@/services/moment.service";

export default function ComplainList() {
  const loadDataDone = useRef<boolean>(false);
  const [data, setData] = useState<GetComplaintListResponse["data"]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);

    try {
      const resQuery = await getComplaintList();

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
        <h3 className="portlet-title">Laporan pengaduan</h3>
        <div className="portlet-addon">
          <Link
            href="/dashboard/complaint/compose"
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
            {data.map((complaint) => (
              <div className="richlist-item" key={complaint.id}>
                <div className="richlist-content">
                  <h4 className="richlist-title">{complaint.title}</h4>
                  <p className="richlist-subtitle">
                    {moment(complaint.createdAt).fromNow()}
                    {complaint.status === "SUBMITTED" ? (
                      <span className="badge badge-primary mx-1">Diajukan</span>
                    ) : complaint.status === "RESPONDED" ? (
                      <span className="badge badge-success mx-1">
                        Ditanggapi
                      </span>
                    ) : complaint.status === "CANCELED" ? (
                      <span className="badge badge-danger mx-1">
                        Dibatalkan
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="richlist-addon">
                  <Link
                    href={`/dashboard/complaint/view?id=${complaint.id}`}
                    className="btn btn-primary btn-wide rounded-pill"
                  >
                    Lihat
                  </Link>
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
