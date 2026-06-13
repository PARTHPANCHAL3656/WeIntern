# Auth System — Authentication

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> Week 2 · Task 3 · Authentication System

## Objective

A secure full-stack authentication system with user registration, login, JWT-based session management, and protected routes — built with Node.js, Express, MongoDB Atlas, and vanilla JS frontend.

---

## Features

- ✅ User registration with username, email, and password
- ✅ Password hashing with bcryptjs (salt rounds: 10)
- ✅ Login with credential validation against database
- ✅ JWT token generation on successful login (expires in 1 day)
- ✅ Auth middleware protecting backend routes
- ✅ Protected dashboard — redirects to login if no valid token
- ✅ Logout by clearing token from localStorage
- ✅ Duplicate email/username detection on registration
- ✅ Meaningful error messages for all failure states

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Register | `client/register.html` | Create account with username, email, password |
| Login | `client/login.html` | Authenticate and receive JWT token |
| Dashboard | `client/dashboard.html` | Protected page — requires valid token to access |

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/dashboard` | Protected dashboard data | Yes (Bearer token) |

---

## Tech Stack

- **Backend** — Node.js + Express.js
- **Database** — MongoDB Atlas (M0 Free Tier) via Mongoose
- **Authentication** — JWT (`jsonwebtoken`) — 1 day expiry
- **Password Hashing** — bcryptjs (salt rounds: 10)
- **Frontend** — Vanilla HTML5, CSS3, JavaScript ES6+
- **Environment** — dotenv for secrets management

---

## Project Structure

```
auth-system/
├── server/
│   ├── index.js                  # Express app, DB connection, route mounting
│   ├── .env                      # Environment variables (not committed)
│   ├── models/
│   │   └── User.js               # Mongoose schema (username, email, password)
│   ├── routes/
│   │   └── auth.js               # /register and /login endpoints
│   └── middleware/
│       └── authMiddleware.js     # JWT verification middleware
└── client/
    ├── register.html             # Registration form
    ├── login.html                # Login form
    └── dashboard.html            # Protected dashboard page
```

---

## Running Locally

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account (free at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas))

### Setup

```bash
# Clone the repository
git clone https://github.com/PARTHPANCHAL3656/auth-system.git
cd auth-system/server

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to `server/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/auth-system?appName=auth-system
JWT_SECRET=your_secret_key_here
PORT=5000
```

```bash
# Start the server
node index.js
```

Expected output:
```
MongoDB connected
Server running on port 5000
```

### Using the App

Open `client/register.html` directly in your browser (no frontend server needed).

Full flow: **Register → Login → Dashboard → Logout**

---

## Security Notes

| Concern | Implementation |
|--------|----------------|
| Password storage | bcryptjs hash with salt rounds=10 — plaintext never stored |
| Token forgery | JWT signed with `JWT_SECRET` — tampered tokens rejected by `jwt.verify()` |
| User enumeration | Same error message for wrong email and wrong password |
| Protected routes | Backend middleware validates token independently — frontend redirect alone is not the guard |
| Token storage | JWT stored in `localStorage` — acceptable for internship/dev scope; production should use HttpOnly cookies |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens |
| `PORT` | Port the Express server runs on (default: 5000) |

> ⚠️ Never commit `.env` to GitHub. Add it to `.gitignore`.

---

## Dependencies

```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "bcryptjs": "^2.x",
  "jsonwebtoken": "^9.x",
  "dotenv": "^16.x",
  "cors": "^2.x"
}
```

Install all with:
```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
```

---

> **Task 3 · WeIntern Full Stack Development · Week 2**