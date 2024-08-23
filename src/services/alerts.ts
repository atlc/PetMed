import Swal from "sweetalert2";

const timer = 5000;

const success = (message: string, title?: string) => {
    return Swal.fire({
        icon: "success",
        text: message,
        title: title || "Success!",
        toast: true,
        timer,
        position: "top-right",
    });
};

const error = (message: string, title?: string) => {
    return Swal.fire({
        icon: "error",
        text: message,
        title: title || "That's ruff!",
        toast: true,
        timer,
        position: "top-right",
    });
};

export default {
    success,
    error,
};
