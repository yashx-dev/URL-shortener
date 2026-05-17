import {
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  CursorArrowRaysIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import CopyButton from "../shared/CopyButton.jsx";
import Button from "../ui/Button.jsx";

const UrlCard = ({ url, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* URL Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <a
              href={url.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline truncate flex items-center gap-1"
            >
              {url.shortUrl}
              <ArrowTopRightOnSquareIcon className="h-4 w-4 shrink-0" />
            </a>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              <CursorArrowRaysIcon className="h-3 w-3" />
              {url.clicks || 0} clicks
            </span>
          </div>

          <p
            className="text-sm text-gray-500 dark:text-gray-400 truncate"
            title={url.originalUrl}
          >
            {url.originalUrl}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <CalendarIcon className="h-3.5 w-3.5" />
            {formatDate(url.createdAt)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:shrink-0">
          <CopyButton text={url.shortUrl} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(url._id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            title="Delete URL"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
