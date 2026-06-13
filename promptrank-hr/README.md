# PromptRank HR — Employee Management System

A full-stack CRUD web app for managing employee records. Built with vanilla HTML/CSS/JS, Node.js, Express, and MongoDB Atlas.

**WeIntern Pvt. Ltd. — Full Stack Development | Task 2**

---

## Features

- Add, view, edit, and delete employee records
- Search by name, department, or role (client-side, instant)
- Input validation on all form fields
- Delete confirmation modal
- Responsive: table on desktop, cards on mobile
- REST API with proper error handling
- MongoDB Atlas for persistent cloud storage

## Employee Fields

| Field      | Type   |
|------------|--------|
| Name       | String |
| Department | String |
| Role       | String |
| Salary     | Number |
| Join Date  | Date   |

---

## Tech Stack

| Layer    | Technology                |
|----------|---------------------------|
| Frontend | HTML, CSS, JavaScript     |
| Backend  | Node.js, Express.js       |
| Database | MongoDB Atlas (Mongoose)  |
| Deploy   | Vercel (serverless)       |
| Testing  | Postman                   |

---

## Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/promptrank-hr.git
cd promptrank-hr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MongoDB Atlas

1. Go to https://cloud.mongodb.com and create a free account
2. Create a new **free cluster** (M0 — Shared, always free)
3. Under **Database Access**: add a user with username + password
4. Under **Network Access**: add `0.0.0.0/0` to allow all IPs (needed for Vercel)
5. Click **Connect → Drivers** and copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`
6. Replace `<password>` with your actual password and add the DB name:
   `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/promptrank-hr`

### 4. Create your .env file

```bash
cp .env.example .env
```

Open `.env` and paste your connection string:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/promptrank-hr?retryWrites=true&w=majority
```

**Never commit `.env` to GitHub.** It is already in `.gitignore`.

### 5. Run locally

**Option A — Using Vercel CLI (recommended, runs frontend + backend together)**

```bash
npm install -g vercel
vercel dev
```

Open `http://localhost:3000`

**Option B — Backend only (for API testing with Postman)**

```bash
node api/index.js
```

API runs on `http://localhost:5000`. Open `public/index.html` directly in your browser.

---

## API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | /api/employees        | Get all employees    |
| POST   | /api/employees        | Create new employee  |
| PUT    | /api/employees/:id    | Update employee      |
| DELETE | /api/employees/:id    | Delete employee      |

### Example — Create Employee

```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Parth Panchal",
    "department": "Engineering",
    "role": "Frontend Developer",
    "salary": 50000,
    "joinDate": "2026-06-01"
  }'
```

---

## Postman Testing

1. Open Postman
2. Click **Import** → select `postman/PromptRankHR.postman_collection.json`
3. Set the `BASE_URL` collection variable to `http://localhost:5000`
4. Run **Create Employee** first, then copy the `_id` from the response into `EMPLOYEE_ID` to test Update and Delete

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "feat: PromptRank HR - employee management system"
git push origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New Project** → import your repo
3. Under **Environment Variables**, add:
   - `MONGO_URI` = your MongoDB Atlas connection string
4. Click **Deploy**

Vercel will auto-detect `vercel.json` and route `/api/*` to the serverless function.

### 3. Update Postman

Change the `BASE_URL` collection variable to your Vercel production URL
(e.g. `https://promptrank-hr.vercel.app`)

---

## Project Structure

```
promptrank-hr/
├── api/
│   ├── config/
│   │   └── db.js           # MongoDB connection (cached for serverless)
│   ├── models/
│   │   └── Employee.js     # Mongoose schema
│   └── index.js            # Express app + all CRUD routes
├── public/
│   ├── index.html          # Single-page app
│   ├── css/
│   │   └── style.css       # Dark navy design system
│   └── js/
│       ├── api.js          # Fetch wrapper
│       └── app.js          # UI logic
├── postman/
│   └── PromptRankHR.postman_collection.json
├── .env.example            # Template — copy to .env
├── .gitignore
├── package.json
├── vercel.json             # Serverless routing config
└── README.md
```

---

## Database Schema

```js
{
  name:       { type: String,  required: true,  maxlength: 100 },
  department: { type: String,  required: true,  maxlength: 100 },
  role:       { type: String,  required: true,  maxlength: 100 },
  salary:     { type: Number,  required: true,  min: 1 },
  joinDate:   { type: Date,    required: true },
  createdAt:  Date,   // auto (timestamps: true)
  updatedAt:  Date,   // auto (timestamps: true)
}
```
