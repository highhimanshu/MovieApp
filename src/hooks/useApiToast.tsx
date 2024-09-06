import { useState } from "react";
import { toast, ToastOptions } from "react-hot-toast";

const useApiToast = () => {
  const [toastId, setToastId] = useState<string | undefined>(undefined);

  const showToast = (
    message: string,
    type: "loading" | "success" | "error"
  ) => {
    const options: ToastOptions = {
      duration: type === "loading" ? Infinity : 3000,
    };

    if (toastId) {
      toast.dismiss(toastId);
    }

    let newToastId;
    switch (type) {
      case "loading":
        newToastId = toast.loading(message, options);
        break;
      case "success":
        newToastId = toast.success(message, options);
        break;
      case "error":
        newToastId = toast.error(message, options);
        break;
    }

    setToastId(newToastId);
  };

  return { showToast, toastId };
};

export default useApiToast;
