import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { userLogout, userUpdateProfile } from "../services/AuthServices.js";
import { createUrl, getUrls, deleteUrl } from "../services/UrlServices.js";
import StatsOverview from "../components/dashboard/StatsOverview.jsx";
import CreateUrlForm from "../components/dashboard/CreateUrlForm.jsx";
import UrlList from "../components/dashboard/UrlList.jsx";
import ProfileForm from "../components/dashboard/ProfileForm.jsx";
import Loader from "../components/shared/Loader.jsx";
import Toast from "../components/shared/Toast.jsx";

const Dashboard = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState(null);

  const currentTab = searchParams.get("tab") || "overview";

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchUrls = async () => {
    try {
      const data = await getUrls();
      setUrls(data.urls || []);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to load URLs",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateUrl = async (originalUrl) => {
    setCreating(true);
    try {
      await createUrl({ originalUrl });
      showToast("URL shortened successfully!");
      fetchUrls();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to create short URL",
        "error",
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
      await deleteUrl(id);
      showToast("Link deleted successfully");
      fetchUrls();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to delete URL",
        "error",
      );
    }
  };

  const handleLogout = async () => {
    try {
      await userLogout();
      logout();
      showToast("Logged out successfully");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showToast("Logout failed", "error");
    }
  };

  const handleProfileUpdate = async (updateData) => {
    try {
      const data = await userUpdateProfile(updateData);
      updateUserProfile(data.user);
      showToast("Profile updated successfully");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to update profile",
        "error",
      );
      throw error;
    }
  };

  const setTab = (tab) => {
    setSearchParams(tab === "overview" ? {} : { tab });
  };

  if (loading) return <Loader text="Loading your dashboard..." />;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentTab === "profile" ? "Profile Settings" : "Dashboard"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {currentTab === "profile"
              ? "Manage your account details"
              : "Manage and track your shortened links"}
          </p>
        </div>
      </div>

      {/* Tab Navigation (Mobile-friendly) */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-1 overflow-x-auto">
        {[
          { id: "overview", label: "Overview" },
          { id: "urls", label: "My Links" },
          { id: "profile", label: "Profile" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${
                currentTab === tab.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Based on Tab */}
      {currentTab === "overview" && (
        <>
          <StatsOverview urls={urls} />
          <CreateUrlForm onSubmit={handleCreateUrl} loading={creating} />
          <UrlList
            urls={urls.slice(0, 5)}
            onDelete={handleDelete}
            onCreateClick={() => setTab("urls")}
          />
          {urls.length > 5 && (
            <button
              onClick={() => setTab("urls")}
              className="w-full py-3 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              View all {urls.length} links →
            </button>
          )}
        </>
      )}

      {currentTab === "urls" && (
        <>
          <CreateUrlForm onSubmit={handleCreateUrl} loading={creating} />
          <UrlList
            urls={urls}
            onDelete={handleDelete}
            onCreateClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          />
        </>
      )}

      {currentTab === "profile" && (
        <ProfileForm
          user={user}
          onUpdate={handleProfileUpdate}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Dashboard;
