import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

const CopyButton = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
        transition-all duration-200
        ${
          copied
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }
        ${className}
      `}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <CheckIcon className="h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="h-4 w-4" />
          Copy
        </>
      )}
    </button>
  );
};

export default CopyButton;
