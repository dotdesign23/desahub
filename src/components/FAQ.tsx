"use client";

import classNames from "classnames";
import { useState } from "react";

const FAQ_CONTENT = [
  {
    question: "Apakah website ini bisa digunakan oleh semua warga?",
    answer:
      "Website ini hanya diperuntukkan bagi masyarakat yang memiliki domisili di Desa Sidosari sesuai KTP.",
  },
  {
    question:
      "Bagaimana jika saya bukan warga Desa Sidosari tetapi ingin mengajukan surat?",
    answer:
      "Jika Anda bukan warga yang tercatat berdomisili Sidosari di KTP, pengajuan surat harus dilakukan langsung di kantor desa sesuai prosedur yang berlaku.",
  },
  {
    question:
      "Apakah saya harus datang ke balai desa setelah mengajukan surat atau laporan?",
    answer:
      "Tidak, Anda tidak perlu datang ke balai desa. Informasi mengenai status pengajuan Anda akan dikirimkan melalui WhatsApp ke nomor yang Anda daftarkan. Anda hanya perlu datang ke balai desa untuk mengambil surat saat menerima informasi bahwa surat anda sudah selesai diproses. ",
  },
  {
    question:
      "Bagaimana saya mengetahui status laporan atau pengajuan surat saya?",
    answer:
      "Anda dapat secara langsung mengecek status pengajuan surat dan pelaporan anda pada website. Admin desa juga akan menghubungi Anda melalui WhatsApp untuk memberikan informasi terkini mengenai status pengajuan surat atau laporan Anda.",
  },
  {
    question: "Layanan surat apa saja yang bisa diajukan melalui website ini?",
    answer:
      "Anda dapat mengajukan berbagai layanan surat, seperti surat keterangan domisili, surat keterangan tidak mampu, surat keterangan kematian, surat keterangan usaha. ",
  },
  {
    question:
      "Apakah saya bisa mengajukan lebih dari satu surat atau laporan dalam satu waktu?",
    answer:
      "Ya, Anda dapat mengajukan beberapa surat atau laporan, namun setiap pengajuan harus diisi secara terpisah.",
  },
  {
    question: "Kapan saya bisa menggunakan layanan ini?",
    answer:
      "Website ini dapat diakses 24/7 untuk pengajuan surat dan laporan. Namun, pemrosesan oleh admin desa mengikuti jam kerja desa.",
  },
];
const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (inputKey: number) => {
    if (inputKey === activeAccordion) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(inputKey);
    }
  };

  return (
    <div className="portlet">
      <div className="portlet-header">
        <h3 className="portlet-title text-center">Pertanyaan umum</h3>
      </div>
      <div className="portlet-body">
        <div className="accordion">
          {FAQ_CONTENT.map((data, key) => (
            <div key={key} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  type="button"
                  className={classNames("accordion-button", {
                    collapsed: activeAccordion !== key,
                  })}
                  onClick={() => toggleAccordion(key)}
                >
                  {data.question}
                </button>
              </h2>
              <div
                id="collapseOne"
                className={classNames("accordion-collapse", "collapse", {
                  show: activeAccordion === key,
                })}
              >
                <div className="accordion-body">{data.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
