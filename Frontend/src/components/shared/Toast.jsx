import { useEffect } from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircleIcon,
    error: ExclamationCircleIcon,
    info: InformationCircleIcon,
  };

  const styles = {
    success:
      "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
    error:
      "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
    info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  };

  const Icon = icons[type];

  return (
    <div
      className={`
      fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg 
      animate-slide-in max-w-sm ${styles[type]}
    `}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
