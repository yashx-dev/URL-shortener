<img width="320" height="180" alt="home" src="https://github.com/user-attachments/assets/b93247d2-205a-4518-aaa0-98af8333635b" />
<img width="320" height="180" alt="home2" src="https://github.com/user-attachments/assets/ffc6031c-0bda-4a63-b6c7-f6a09553dead" />
<img width="320" height="180" alt="dashboard" src="https://github.com/user-attachments/assets/13968cf8-6b06-41b9-904f-ccb95dba523f" />
<img width="320" height="180" alt="profile" src="https://github.com/user-attachments/assets/58c695b1-d542-4b6f-9830-9c9c0b7ab056" />


# 🔗 URL Shortener (MERN Stack)

A full-stack URL shortener application built using the MERN stack. It allows users to register, login, create short URLs, and track click counts from a personal dashboard.

---

# 🚀 Features

* User registration and login system
* JWT authentication (protected routes)
* Create short URLs from long URLs
* Redirect short URL → original URL
* Click tracking for each URL
* User-specific dashboard
* Basic analytics (click count)

---

# 🛠️ Tech Stack

Frontend:

* React.js
* React Router DOM
* Axios
* CSS / Tailwind 

Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcrypt.js

---

# 📁 Project Structure

```
url-shortener/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json

```

---

# ⚙️ Setup Instructions

## 1. Clone repository

```bash
git clone https://github.com/yashx-dev/URL-shortener
cd url-shortener
```

---

## 2. Backend setup

```bash
cd Backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:5000
```

Run backend:

```bash
npm start
```

---

## 3. Frontend setup

```bash
cd Frontend
npm install
npm run build
```

---

# 🔌 API Endpoints

## Auth

* POST `/auth/register` → Register user
* POST `/auth/login` → Login user

## URLs

* POST `/url/shorten` → Create short URL
* GET `/:shortId` → Redirect to original URL
* GET `/url/user` → Get user URLs

---

## 🔐 Authentication Flow

- User logs in / registers  
- Server generates JWT token  
- Token is stored in HTTP-only cookies  
- Browser automatically sends cookie with each request  
- Backend middleware reads and verifies token from cookie  
- Protected routes are allowed/blocked based on verification  
---

# 🧠 Key Learnings

* MERN stack full workflow
* JWT authentication system
* REST API design
* MongoDB schema design
* Protected routes in React
* URL redirection handling

---

# 🔮 Future Improvements

* Custom short URLs
* Expiry time for links
* QR code generation
* Advanced analytics (device / location)
* Rate limiting
* Redis caching

---

# 👨‍💻 Author

GitHub: https://github.com/yashx-dev





