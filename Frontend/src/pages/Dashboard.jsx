import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import logoutUser from "../services/AuthServices.js";
import { createUrl, getUrls, deleteUrl } from "../services/UrlServices.js";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrl] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUrls = async () => {
    try {
      const data = await getUrls();
      setUrl(data.urls);
    } catch (error) {
      console.log(error.response.message);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    try {
      setLoading(true);
      await createUrl({ originalUrl });
      setOriginalUrl("");
      fetchUrls();
    } catch (error) {
      console.log(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUrl(id);
      fetchUrls();
    } catch (error) {
      console.log(error.response.message);
    }
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
    } catch (error) {
      console.log(error.response.message);
    }
  };

  return (
    <div>
      {/* PROFILE SECTION */}

      <section>
        <h1>Welcome {user?.name}</h1>

        <p>{user?.email}</p>

        <button onClick={handleLogout}>Logout</button>
      </section>

      <hr />

      {/* CREATE URL SECTION */}

      <section>
        <h2>Create Short URL</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />

          <button type="submit">
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>
      </section>

      <hr />

      {/* URL LIST SECTION */}

      <section>
        <h2>Your URLs</h2>

        {urls.length === 0 ? (
          <p>No URLs found</p>
        ) : (
          urls.map((url) => (
            <div key={url._id}>
              <p>Original URL:</p>

              <a href={url.originalUrl} target="_blank" rel="noreferrer">
                {url.originalUrl}
              </a>

              <p>Short URL:</p>

              <a href={url.shortUrl} target="_blank" rel="noreferrer">
                {url.shortUrl}
              </a>

              <p>
                Clicks:
                {url.clicks}
              </p>

              <button onClick={() => handleDelete(url._id)}>Delete</button>

              <hr />
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Dashboard;
