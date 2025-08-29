# ADORE

ADORE is a full-stack web application designed to help **rural communities easily find and access essential products** such as groceries, medicines, and services.  
The platform allows users to register, log in, browse products, and securely manage their profiles.

---

## 📂 Project Structure
```
ADORE/
│
├── Backend/              # Node.js + Express + PostgreSQL backend
│   ├── index.js          # Main server file
│   ├── package.json      # Backend dependencies
│   ├── .env              # Environment variables
│   └── Schemadb/         # Database schema
│
├── frontend/             # React (Vite) frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Images, logos, etc.
│   │   ├── Component/    # Main UI Components
│   │   │   ├── Contact/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Navbar/
│   │   │   ├── Products/
│   │   │   ├── Profile/
│   │   │   ├── ProtectedRoute/
│   │   │   ├── Register/
│   │   │   └── Services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
│
├── README.md / README.txt
└── .gitignore

---
```
## 🛠️ Tech Stack Used

**Frontend**  
- React (Vite)  
- React Router  
- CSS Modules  
- Tailwind CSS

**Backend**  
- Node.js  
- Express.js  
- PostgreSQL  
- `pg` (node-postgres)  
- bcrypt (for password hashing)  
- JWT (for authentication)  
- CORS  

---

## 🚀 How to Run the App Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Kundan-Rawal/ADORE.git
cd ADORE
```

### 2️⃣ Backend Setup
```bash
cd Backend
npm install
```

- Create a `.env` file inside `Backend/`:
```
DB_URL='postgresql://neondb_owner:npg_OtkX5nUVp3Ax@ep-wild-dew-a17s9hpe-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

- Start the backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

- The frontend runs on:  
👉 http://localhost:5173  
- The backend runs on:  
👉 http://localhost:3000  

---

## ✨ Features Covered

- User Registration & Login (with JWT authentication)  
- Protected Routes (only logged-in users can access profile, etc.)  
- Contact form (submits data to backend & stores in DB)  
- Profile management (update name & phone, email unchangeable)  
- Product listing pages (groceries, medicines, etc.)  
- Secure password hashing (bcrypt)  
- CORS-enabled backend for deployment  

---

## 🔑 Demo Login (Optional for Reviewers)

You can choose to register and create a credential and login accordingly no need for any demo logins. 
but if you want 

```bash
email: demo@gmail.com
password: demodemo
```

