import Swal from "sweetalert2";

export const customErrorMessage = (msg) =>
  Swal.fire({
    icon: "error",
    text: msg,
    showConfirmButton: true,
    timer: 1500,
  });

export const customSuccessMessage = (msg) =>
  Swal.fire({
    icon: "success",
    text: msg,
    showConfirmButton: true,
    timer: 1500,
  });

export const customWarningMessage = (msg) => Swal.fire("", msg, "question");
