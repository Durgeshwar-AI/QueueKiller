# QueueKiller

QueueKiller is a full-stack scheduling and queue management application. It consists of a React TypeScript frontend and a Node.js/Express backend, designed to help companies and users manage schedules and appointments efficiently.

## Project Structure

```
QueueKiller/
├── client/         # Frontend (React + TypeScript + Vite)
│   ├── public/     # Static assets
│   ├── src/        # Source code
│   │   ├── assets/         # Images and static assets
│   │   ├── components/     # Reusable UI components
│   │   │   ├── company/
│   │   │   ├── Dashboard/
│   │   │   └── Landing/
│   │   ├── pages/          # Main pages (BookSchedule, Scheduler)
│   │   └── redux/          # Redux store setup
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
├── server/         # Backend (Node.js + Express)
│   ├── controllers/    # Route controllers (schedule logic)
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Mongoose models (schedule)
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions (e.g., db.js)
│   ├── app.js          # Express app entry point
│   └── package.json    # Backend dependencies
└── README.md      # Project documentation
```

## Features

- Company and user scheduling
- Book and edit schedules
- Dashboard and landing pages
- Redux for state management (frontend)
- RESTful API for schedule management (backend)
- MongoDB integration (via Mongoose)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Setup

#### 1. Clone the repository

```powershell
git clone https://github.com/Durgeshwar-AI/QueueKiller.git
cd QueueKiller
```

#### 2. Install dependencies

- Frontend:
  ```powershell
  cd client
  npm install
  ```
- Backend:
  ```powershell
  cd ../server
  npm install
  ```

#### 3. Configure environment variables

- Set up your MongoDB connection string in `server/utils/db.js` or use environment variables as needed.

#### 4. Run the application

- Start the backend:
  ```powershell
  cd server
  npm start
  ```
- Start the frontend (in a new terminal):
  ```powershell
  cd client
  npm run dev
  ```

## Folder Details

- **client/src/components/company/**: Components for company schedule management (create/edit)
- **client/src/pages/**: Main pages for booking and scheduling
- **server/controllers/**: Handles API logic for schedules
- **server/models/**: Mongoose models for MongoDB
- **server/routes/**: Express route definitions

## License

MIT
