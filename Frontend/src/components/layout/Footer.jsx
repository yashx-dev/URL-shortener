import { LinkIcon, HeartIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              ShortLink
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Built with{" "}
            <HeartIcon className="h-4 w-4 text-red-500 fill-current" /> using
            React & Node.js
          </p>

          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
