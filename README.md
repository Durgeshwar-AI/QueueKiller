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

# QueueKiller Server

A Node.js/Express server for managing schedules, built with TypeScript, ESM modules, Mongoose, and tested with Jest.

---

## Features

- TypeScript-first codebase
- ESM module support (`"type": "module"`)
- Express REST API for schedule management
- MongoDB/Mongoose models
- Jest + ts-jest for unit testing

---

## Getting Started

### Prerequisites

- Node.js v18+ (for stable ESM support)
- npm
- MongoDB

### Installation

```bash
cd server
npm install
```

### Configuration

- Copy `.env.example` to `.env` and fill in your MongoDB URI and other secrets.

### Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start server in development mode (nodemon) |
| `npm run build` | Compile TypeScript to `dist/`              |
| `npm start`     | Run compiled server from `dist/`           |
| `npm test`      | Run Jest unit tests                        |
| `npm run lint`  | Run ESLint                                 |

### Running the Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

---

## Testing

- Tests are written in TypeScript and use Jest with ESM and ts-jest.
- Test files are named `*.test.ts` and live in the `src/tests` or `tests` directory.

#### Run all tests

```bash
npm test
```

#### Notes for ESM + Jest

- The project uses `"type": "module"` in `package.json`.
- Jest config is in `jest.config.mjs` and uses the `ts-jest/presets/default-esm` preset.
- Mocks in tests must use `jest.unstable_mockModule` and dynamic `import()`.

---

## Project Structure

```
server/
  src/
    controllers/
    models/
    services/
    tests/
    ...
  dist/
  package.json
  tsconfig.json
  jest.config.mjs
```

---

## Troubleshooting

- **ECMAScript imports and exports cannot be written in a CommonJS file**  
  → Ensure `"type": "module"` is set in `package.json` and `tsconfig.json` uses `"module": "NodeNext"` or `"module": "ESNext"`.

- **Jest cannot find module with .js extension**  
  → Use `.js` in import paths in your TypeScript source, and match those in your test mocks.

- **ts-jest hybrid module warnings**  
  → Set `"isolatedModules": true` in your `tsconfig.json`.

---

## License

MIT
