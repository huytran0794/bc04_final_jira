import Swal from "sweetalert2";

const swalUtils = (type: string, title: string, content: string) => {
  let swalConfig = {};
  switch (type) {
    case "error":
      swalConfig = {
        confirmButtonColor: "#C8235D",
        confirmButtonText: "Confirm",
        icon: "error",
        title: title || "Oops...",
        text: content,
      };
      break;
    case "success":
      swalConfig = {
        icon: "success",
        title: title || "Good job!",
        confirmButtonColor: "#7f66de",
        text: content,
      };
      break;
    default:
      swalConfig = {
        text:content,
      }
      break;
  }
  Swal.fire(swalConfig);
};

export default swalUtils;
