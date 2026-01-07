# Employee Management Dashboard

A modern, full-featured Employee Management Dashboard built with React.js. Features authentication, CRUD operations, search/filter capabilities, and a beautiful dark theme UI.

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### 🔐 Authentication
- Secure login with session persistence
- Protected routes for dashboard access
- Logout functionality

### 📊 Dashboard
- Overview of workforce statistics
- Total, Active, and Inactive employee counts
- Quick action buttons

### 👥 Employee Management
- **View**: Employee list with profile image, name, gender, DOB, state, status
- **Add**: Create new employees with form validation
- **Edit**: Update existing employee details
- **Delete**: Remove employees with confirmation dialog
- **Toggle**: Switch employee active/inactive status
- **Print**: Print individual employee details or full list

### 🔍 Search & Filter
- Search employees by name
- Filter by gender (Male/Female/Other)
- Filter by status (Active/Inactive)
- Combined filtering support

### 🎨 UI/UX
- Modern dark theme with glassmorphism effects
- Responsive design for all screen sizes
- Smooth animations and transitions
- Loading and empty states
- Image upload with preview

## Tech Stack

- **React 19** - Frontend framework
- **React Router v6** - Navigation and routing
- **Context API** - State management
- **LocalStorage** - Data persistence
- **CSS3** - Styling (no frameworks)
- **UUID** - Unique ID generation

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-management-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

```
Username: admin
Password: admin123
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EmptyState/     # Empty state display
│   ├── EmployeeTable/  # Employee data table
│   ├── ImageUpload/    # Image picker with preview
│   ├── Layout/         # Main app layout with sidebar
│   ├── Loader/         # Loading spinner
│   ├── Modal/          # Confirmation dialog
│   ├── ProtectedRoute/ # Auth guard
│   ├── SearchFilter/   # Search and filter controls
│   ├── SummaryCard/    # Dashboard stat cards
│   └── Toggle/         # Toggle switch
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── EmployeeContext.js # Employee data & operations
├── pages/              # Page components
│   ├── Dashboard/      # Dashboard overview
│   ├── EmployeeForm/   # Add/Edit employee form
│   ├── Employees/      # Employee list
│   └── Login/          # Login page
├── utils/              # Utility functions
│   ├── constants.js    # App constants
│   ├── helpers.js      # Helper functions
│   └── mockData.js     # Initial mock data
├── App.js              # Main app with routes
└── index.css           # Global styles
```

## Design Decisions

1. **Context API over Redux**: Simpler state management for this scale of application
2. **LocalStorage**: Persists data locally without backend dependency
3. **CSS Variables**: Enables easy theming and consistent styling
4. **Mock Authentication**: Simulates real auth flow without server setup
5. **Base64 Images**: Stores profile images directly in localStorage

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm test` | Run tests |
| `npm run build` | Build for production |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or commercial purposes.
