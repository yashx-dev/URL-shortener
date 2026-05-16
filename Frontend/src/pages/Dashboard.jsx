import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import { logoutUser, userUpdateProfile } from "../services/AuthServices.js";
import { createUrl, getUrls, deleteUrl } from "../services/UrlServices.js";

const Dashboard = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const fetchUrls = async () => {
    try {
      const data = await getUrls();
      setUrls(data.urls);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUrls();
  }, []);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    try {
      setLoading(true);
      await createUrl({ originalUrl });
      setOriginalUrl("");
      fetchUrls();
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUrl(id);
      fetchUrls();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await userUpdateProfile({ name, email, password });
      updateUserProfile(data.user);
      setPassword("");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div>
      {/* PROFILE SECTION */}

      <section>
        <h1>Profile</h1>

        <form onSubmit={handleProfileUpdate}>
          <div>
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
    
          <br />

          <div>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />

          <div>
            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />

          <button type="submit">Update Profile</button>
        </form>

        <br />

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
