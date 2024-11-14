import sweetalert2 from "sweetalert2/dist/sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Swal = withReactContent(
  sweetalert2.mixin({
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
    customClass: {
      confirmButton: "btn btn-success btn-widest mx-1",
      cancelButton: "btn btn-danger btn-widest mx-1",
    },
    buttonsStyling: false,
  })
);
