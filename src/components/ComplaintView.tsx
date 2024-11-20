import { GetComplaintDetailResponse } from "@/app/actions";
import moment from "@/services/moment.service";
import ComplaintCancelForm from "./ComplaintCancelForm";

export interface ComplaintViewProps {
  data: GetComplaintDetailResponse["data"];
}

const ComplaintView: React.FC<ComplaintViewProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="portlet">
      <div className="portlet-body vstack text-center gap-2 py-4">
        <h3 className="mb-0">{data.title}</h3>
        <p className="mb-0">{data.content}</p>
        <p className="mb-0">
          {data.status === "SUBMITTED" ? (
            <span className="badge badge-primary mx-1">Diajukan</span>
          ) : data.status === "RESPONDED" ? (
            <span className="badge badge-success mx-1">Ditanggapi</span>
          ) : data.status === "CANCELED" ? (
            <span className="badge badge-danger mx-1">Dibatalkan</span>
          ) : null}
          {moment(data.createdAt).format("DD MMM YYYY")}
        </p>
        {data?.attachmentsUrls && data.attachmentsUrls.length > 0 ? (
          <>
            <hr />
            <div className="vstack gap-2">
              {data.attachmentsUrls.map((url) => (
                <img key={url} src={url} alt={url} className="img-fluid" />
              ))}
            </div>
          </>
        ) : null}
        {data.status !== "CANCELED" ? (
          <div className="vstack mt-4">
            <ComplaintCancelForm complaintId={data.id} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ComplaintView;
