# Mortgage Application

A full-stack mortgage management platform that allows customers to request and monitor mortgages and provides administrators the tools to approve applications and manage user accounts.

## Features

### User Portal
- Register and login using secure session-based authentication.
- Manage personal profile details including contact information and income.
- Submit mortgage requests with loan amount, term, and income information.
- Track mortgage application status (pending, approved, rejected).
- View approved mortgage details including interest rate, pending balance, and next payment date.
- Review mortgage payment history.

### Administrator Portal
- Session-protected admin dashboard with role-based access.
- View all mortgage applications with associated user details.
- Approve or reject mortgage requests and update loan details.
- Record mortgage payments and update balances.
- Manage user accounts and roles.

## Tech Stack

- **Backend:** Node.js, Express, Sequelize (SQLite), express-session with Sequelize session store.
- **Frontend:** React (Vite), React Router, Axios.
- **Authentication:** Session-based with role-based access control middleware.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run start
```
The backend listens on `http://localhost:4000` by default. Update `.env` if you need to change the port, session secret, or frontend origin for CORS.

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The Vite dev server runs on `http://localhost:3000` by default. Update `VITE_API_PROXY` in `vite.config.js` or set `VITE_API_URL` when building for alternate environments.

## API Overview

| Method | Route | Description |
| ------ | ----- | ----------- |
| POST | `/auth/register` | Create a new user account. |
| POST | `/auth/login` | Login and create a session. |
| POST | `/auth/logout` | Destroy the active session. |
| GET | `/auth/me` | Retrieve the authenticated user. |
| GET | `/users/me` | Get current user profile. |
| PUT | `/users/me` | Update current user profile. |
| POST | `/mortgages` | Submit a new mortgage request. |
| GET | `/mortgages/me` | List mortgages belonging to the session user. |
| GET | `/users/me/mortgages/:id/payments` | Retrieve payments for a specific mortgage. |
| GET | `/admin/mortgages` | **Admin:** List all mortgages. |
| PUT | `/admin/mortgages/:id` | **Admin:** Update mortgage details. |
| POST | `/admin/mortgages/:id/payments` | **Admin:** Record a mortgage payment. |
| GET | `/admin/users` | **Admin:** List all users. |
| PUT | `/admin/users/:id` | **Admin:** Update user details. |

## Development Notes

- Sessions are persisted in SQLite using `connect-session-sequelize` to support concurrent logins and browser refreshes.
- Sequelize models automatically sync on server start. For production, replace with managed migrations.
- The frontend Axios instance sends requests with credentials to maintain sessions and expects the backend to allow CORS with credentials enabled.
- Update `CLIENT_ORIGIN` in the backend `.env` when deploying to another domain.

## Testing the Flow
1. Register a new user via the React UI and submit a mortgage request.
2. Seed an admin account by updating the database directly or promoting a user through the admin API.
3. Login as the admin to approve mortgage requests and record payments.
4. Switch back to the user account to verify updated mortgage status and payment history.

## Project Structure
```
Mortgage-App/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Future Enhancements
- Replace SQLite with PostgreSQL or MySQL for production scalability.
- Add automated email notifications for mortgage status changes.
- Implement detailed audit logs for administrative actions.
- Introduce analytics dashboards for payment performance.

