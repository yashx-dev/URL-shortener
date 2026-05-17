import { useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

const CreateUrlForm = ({ onSubmit, loading }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const url = originalUrl.trim();

    if (!url) {
      setError("Please enter a URL");
      return;
    }


    if (!url.includes(".") || url.includes(" ")) {
      setError("Please enter a valid URL");
      return;
    }

    onSubmit(url);
    setOriginalUrl("");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-4">
        <LinkIcon className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Create Short Link
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Paste your URL here (e.g., google.com)"
            value={originalUrl}
            onChange={(e) => {
              setOriginalUrl(e.target.value);
              setError("");
            }}
            error={error}
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          isLoading={loading}
          size="lg"
          className="sm:w-auto w-full"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>
    </div>
  );
};

export default CreateUrlForm;
