# QueueKiller Desktop - Company Management Application

A comprehensive desktop application for businesses to manage queues, schedules, departments, and customer bookings.

## Features

### 🔐 Authentication

- Company login with key and password
- JWT-based authentication
- Secure session management
- Redux-based state management

### 📊 Dashboard

- Real-time business metrics
- Total bookings overview
- Upcoming slots management
- Occupancy rate tracking
- Recent activity feed
- Quick action shortcuts

### 🏢 Departments Management

- Create and manage service departments
- Support for multiple department types (General, Health)
- Track schedules per department
- Edit and delete departments
- Real-time department list

### 📅 Schedules Management

- Create and manage service schedules
- Assign schedules to departments
- Set date and time slots
- Manage schedule status (Available, Locked, Booked)
- Filter schedules by department
- Track booking counts

### 👥 Booking Verification

- View all customer bookings
- Verify QR codes for customer check-ins
- Mark customers as attended or missed
- Search bookings by name, email, or QR code
- Filter by booking status
- Real-time booking statistics

### ⚙️ Settings

- Company information management
- Password change functionality
- Account security settings
- Password validation and confirmation

## Project Structure

```
src/
├── pages/                    # Application pages
│   ├── Login.tsx            # Company login page
│   ├── Dashboard.tsx        # Main dashboard
│   ├── Departments.tsx      # Department management
│   ├── Schedules.tsx        # Schedule management
│   ├── Bookings.tsx         # Booking verification
│   ├── Settings.tsx         # Company settings
│   └── Contact.tsx          # Contact page (legacy)
├── components/
│   └── Sidebar.tsx          # Navigation sidebar
├── redux/
│   ├── store.ts             # Redux store configuration
│   └── auth/
│       └── authSlice.ts     # Authentication state & thunks
├── App.tsx                  # Main app component with routing
└── main.tsx                 # Application entry point
```

## Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Desktop Framework**: Tauri 2
- **Bundler**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- Rust (for Tauri)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Building for Tauri

```bash
# Development build
npm run tauri dev

# Production build
npm run tauri build
```

## API Endpoints Used

### Company Authentication

- `POST /api/company/login` - Company login

### Company Departments

- `GET /api/company/departments` - Get all departments
- `GET /api/company/departments/:departmentID` - Get department by ID
- `PUT /api/company/departments` - Update department

### Company Schedules

- `GET /api/company/schedules/:departmentID` - Get schedules by department
- `POST /api/company/schedules` - Create new schedule
- `PUT /api/company/schedules` - Update schedule
- `DELETE /api/company/schedules/:schedulesID` - Delete schedule

### Company Bookings

- `POST /api/company/bookings/verify` - Verify booking with QR code

## Redux Store Structure

```typescript
{
  auth: {
    role: string; // 'company'
    name: string; // Company admin name
    token: string; // JWT token
    isLoggedIn: boolean; // Login status
    loading: boolean; // Loading state
    error: string | null; // Error message
    companyId: number; // Company ID
    companyName: string; // Company name
  }
}
```

## Environment Variables

Create a `.env` file in the desktop app root:

```
VITE_API_URL=http://localhost:8000/api
```

## Features in Detail

### Login Page

- Company key and password authentication
- Error handling and validation
- Loading states
- Responsive design

### Dashboard

- Stats cards with real-time metrics
- Quick action buttons for navigation
- Activity feed
- Mobile-friendly layout

### Departments Management

- Modal-based create/edit interface
- Department type selection
- Schedule count tracking
- Delete confirmation

### Schedules Management

- Date and time selection
- Department filtering
- Status management
- Batch operations

### Booking Verification

- QR code display and scanning
- Status tracking (Upcoming, Attended, Missed)
- Advanced search and filtering
- Attendance verification

### Settings

- Tabbed interface (General, Security)
- Company information editing
- Password change with validation
- Confirmation messages

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Development Notes

- All pages include proper error handling
- Redux selectors used for state access
- Responsive design for mobile and desktop
- Loading states for async operations
- Mock data for development (replace with actual API calls)
- Logout functionality clears all state and localStorage
- Protected routes redirect to login if not authenticated
