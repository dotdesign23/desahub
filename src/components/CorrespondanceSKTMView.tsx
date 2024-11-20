import moment from "@/services/moment.service";

export interface CorrespondanceViewProps {
  content: Record<string, string>;
}

const CorrespondanceView: React.FC<CorrespondanceViewProps> = ({ content }) => {
  return (
    <>
      <tr>
        <th>Nama</th>
        <td>{content.name}</td>
      </tr>
      <tr>
        <th>NIK</th>
        <td>{content.nik}</td>
      </tr>
      <tr>
        <th>Jenis jelamin</th>
        <td>{content.gender}</td>
      </tr>
      <tr>
        <th>Tempat/tanggal lahir</th>
        <td>
          {content.birthPlace} {moment(content.birthDate).format("DD-MM-YYYY")}
        </td>
      </tr>
      <tr>
        <th>Alamat</th>
        <td>{content.address}</td>
      </tr>
      <tr>
        <th>Pekerjaan</th>
        <td>{content.occupation}</td>
      </tr>
    </>
  );
};

export default CorrespondanceView;
