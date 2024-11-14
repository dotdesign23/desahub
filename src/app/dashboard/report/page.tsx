export default async function CorrespondancePage() {
  return (
    <>
      <div className="portlet">
        <div className="portlet-header">
          <h3 className="portlet-title text-center">Adukan Masalah</h3>
        </div>
        <div className="portlet-body">
          <form className="vstack gap-3" action="">
						<textarea rows={15} name="" id="" className="form-control" placeholder="Masukkan rincian masalah"></textarea>
          </form>
        </div>
      </div>
      <div className="portlet">
        <div className="portlet-header">
          <h3 className="portlet-title text-center">Informasi kontak</h3>
        </div>
        <div className="portlet-body">
          <input type="tel" className="form-control" placeholder="Masukkan nomor whatsapp" />
        </div>
      </div>
    </>
  );
}
