# dayflow-hr-management
Dayflow – A smart HRMS that streamlines employee management, attendance, leave, payroll visibility, and approval workflows through a secure role-based platform

Dayflow — Human Resource Management System

Every workday, perfectly aligned.

Dayflow is a full-stack HRMS built for Oodo that digitizes core HR operations — employee onboarding, attendance tracking, leave management, payroll visibility, and approval workflows — with an added AI layer for chatbot support, attrition risk detection, and smart analytics.

Problem Statement

Traditional HR processes are scattered across spreadsheets, emails, and manual approvals — leading to delays, errors, and no real visibility for either employees or HR admins. Dayflow centralizes these operations into a single, role-based platform with proactive AI-driven insights.

Features
Core
Secure authentication (sign up / sign in) with role-based access — Employee vs Admin/HR
Employee dashboard with quick-access cards and activity feed
Admin/HR dashboard with employee list, attendance overview, and pending approvals
Employee profile management (view/edit personal, job, salary, and document details)
Attendance tracking with daily/weekly views and check-in/check-out
Leave and time-off management with apply, approve/reject, and status tracking
Payroll visibility — read-only for employees, full control for admins
Innovation layer
AI HR chatbot — employees ask questions like "How many leaves do I have left?" in plain language
Attrition risk indicator — flags employees at risk based on attendance and leave patterns
Attendance anomaly alerts — surfaces unusual check-in patterns to HR
Smart analytics summaries — plain-English insights above dashboard charts
Gamification badges — recognizes perfect attendance streaks
Tech Stack
Layer	Technology
Frontend	React (Vite), React Router
Backend	Node.js, Express.js
Database	MongoDB with Mongoose
Auth	JWT (JSON Web Tokens)
Charts	Recharts
Icons	lucide-react
System Architecture

Client (React) → Backend API (Express + JWT auth) → MongoDB

The Backend API also connects to an AI services layer that powers the chatbot, attrition risk scoring, and anomaly detection features.

Project Structure
dayflow-hrms/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Dashboard, Attendance, Leave, Payroll pages
│   │   ├── api/            # API call helpers
│   │   └── App.jsx
│   └── package.json
├── server/                 # Node/Express backend
│   ├── models/             # User, Attendance, Leave, Payroll schemas
│   ├── routes/             # API route handlers
│   ├── middleware/         # JWT auth middleware
│   ├── services/           # AI chatbot & analytics logic
│   └── server.js
└── README.md
Getting Started
Prerequisites
Node.js (v18 or higher)
MongoDB (local instance or MongoDB Atlas)
Backend Setup
bash
cd server
npm install
# create a .env file with MONGO_URI and JWT_SECRET
npm run dev
Frontend Setup
bash
cd client
npm install
npm run dev

The frontend runs on http://localhost:5173 and connects to the backend on http://localhost:5000 (adjust the API base URL in client/src/api/ if different).

Demo Data

Run the seed script to populate sample employees, attendance, and leave records for a live demo:

bash
cd server
npm run seen 

Future Enhancements
Mobile app (React Native)
Biometric/geo-fenced attendance
Automated payroll processing with tax calculations
Multi-language support
License

