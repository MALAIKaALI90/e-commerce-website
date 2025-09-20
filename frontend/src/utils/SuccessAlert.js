import Swal from "sweetalert2";

const SuccessAlert = (title) => {
  return Swal.fire({
    title: title,
    icon: "success",   // ✅ use icon, not type
    confirmButtonText: "OK",
  });
};

export default SuccessAlert;
