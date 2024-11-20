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
        <th>Status perkawinan</th>
        <td>{content.maritalStatus}</td>
      </tr>
      <tr>
        <th>Agama</th>
        <td>{content.religion}</td>
      </tr>
      <tr>
        <th>Pekerjaan</th>
        <td>{content.occupation}</td>
      </tr>
      <tr>
        <th>Alamat</th>
        <td>{content.address}</td>
      </tr>
      <tr>
        <th>Kontak</th>
        <td>{content.whatsappContact}</td>
      </tr>
    </>
  );
};

export default CorrespondanceView;
