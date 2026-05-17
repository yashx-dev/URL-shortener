import {
  LinkIcon,
  CursorArrowRaysIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const StatsOverview = ({ urls }) => {
  const totalUrls = urls?.length || 0;
  const totalClicks =
    urls?.reduce((sum, url) => sum + (url.clicks || 0), 0) || 0;
  const avgClicks = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;

  const stats = [
    { name: "Total Links", value: totalUrls, icon: LinkIcon, color: "blue" },
    {
      name: "Total Clicks",
      value: totalClicks,
      icon: CursorArrowRaysIcon,
      color: "green",
    },
    {
      name: "Avg. Clicks",
      value: avgClicks,
      icon: ChartBarIcon,
      color: "purple",
    },
  ];

  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    green:
      "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    purple:
      "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.name}
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${colorStyles[stat.color]}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
