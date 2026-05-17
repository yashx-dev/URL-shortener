import { LinkIcon } from "@heroicons/react/24/outline";
import UrlCard from "./UrlCard.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import Button from "../ui/Button.jsx";

const UrlList = ({ urls, onDelete, onCreateClick }) => {
  if (!urls || urls.length === 0) {
    return (
      <EmptyState
        icon={LinkIcon}
        title="No links yet"
        description="Start by creating your first short link. It's quick and easy!"
        action={
          <Button onClick={onCreateClick} variant="primary">
            Create Your First Link
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Links
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {urls.length} {urls.length === 1 ? "link" : "links"}
        </span>
      </div>

      <div className="grid gap-4">
        {urls.map((url) => (
          <UrlCard key={url._id} url={url} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default UrlList;
