# Subscription Management Dashboard

A full-stack SaaS admin dashboard that allows users to subscribe to plans, view their active subscriptions, and manage their profiles with a clean and responsive UI.

## 👨‍💻 Developer Information

**Name:** [Your Name]  
**Email:** [Your Email]  
**GitHub:** [Your GitHub Profile]

## 🚀 Tech Stack

### Frontend
- **React.js** - UI Framework (with Vite)
- **TailwindCSS** - Styling
- **Zustand** - State Management
- **React Router** - Routing
- **Axios** - HTTP Client
- **Heroicons** - Icons

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **PostgreSQL** - Database
- **Knex.js** - Query Builder & Migrations
- **JWT** - Authentication (Access & Refresh Tokens)
- **Bcrypt** - Password Hashing
- **Joi** - Validation

## ✨ Features

### Authentication & Authorization
- ✅ JWT-based authentication with access & refresh tokens
- ✅ Role-based access control (Admin & User)
- ✅ Automatic token refresh
- ✅ Secure password hashing

### Subscription Management
- ✅ View all available plans
- ✅ Subscribe to a plan
- ✅ View active subscription details
- ✅ Cancel subscription
- ✅ Admin dashboard to view all subscriptions

### UI & UX
- ✅ Fully responsive design
- ✅ Dark/Light theme toggle
- ✅ Professional and clean interface
- ✅ Loading states and error handling
- ✅ Protected routes

## 📁 Project Structure

```
subscription-dashboard-task/
├── client/                  # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Zustand store
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── server/                  # Backend Node.js application
    ├── controllers/        # Route controllers
    ├── middleware/         # Custom middleware
    ├── migrations/         # Database migrations
    ├── routes/            # API routes
    ├── seeders/           # Database seeders
    ├── utils/             # Utility functions
    ├── db.js              # Database connection
    ├── knexfile.js        # Knex configuration
    ├── server.js          # Entry point
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE subscription_db;
```

2. Create a PostgreSQL user (optional):
```sql
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE subscription_db TO your_user;
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=subscription_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_change_in_production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:5173
```

5. Run migrations:
```bash
npx knex migrate:latest
```

6. Seed the database with sample plans:
```bash
npm run seed
```

7. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` if needed:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

### Creating an Admin User

To create an admin user, you can directly insert into the database:

```sql
-- First, register a user through the application, then update their role
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

Or modify the register endpoint temporarily to accept a role parameter.

### Default Test Accounts

After setting up, you can:
1. Register a new account through `/register`
2. Create an admin account using the SQL command above
3. Login with your credentials

### Available Routes

**Public Routes:**
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page

**Protected Routes (Require Authentication):**
- `/plans` - View all subscription plans
- `/dashboard` - User dashboard with subscription details

**Admin Routes (Require Admin Role):**
- `/admin/subscriptions` - Admin dashboard to view all subscriptions

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (Protected)

### Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/:id` - Get plan by ID

### Subscriptions
- `POST /api/subscribe/:planId` - Subscribe to a plan (Protected)
- `GET /api/my-subscription` - Get user's active subscription (Protected)
- `DELETE /api/cancel` - Cancel subscription (Protected)
- `GET /api/admin/subscriptions` - Get all subscriptions (Admin only)

## 🎨 Features Implemented

### Required Features
✅ JWT Authentication with Access & Refresh Tokens  
✅ Role-based Authorization (Admin, User)  
✅ Subscription Module with PostgreSQL  
✅ Request Validation (Joi)  
✅ Structured Error Handling  
✅ Database Seeding  
✅ Responsive UI with TailwindCSS  
✅ State Management with Zustand  
✅ Token Auto-refresh  
✅ Protected Routes  
✅ Professional Navigation  
✅ User Dashboard  
✅ Admin Dashboard  

### Bonus Features
✅ Dark/Light Theme Toggle  
✅ Subscription Status Tracking  
✅ Days Remaining Indicator  
✅ Cancel Subscription Feature  
✅ Admin Statistics Dashboard  
✅ Filter Subscriptions by Status  

## 🚢 Deployment

### Backend Deployment (Railway/Render)

1. Create account on Railway or Render
2. Create a new PostgreSQL database
3. Create a new web service
4. Connect your GitHub repository
5. Set environment variables
6. Deploy

### Frontend Deployment (Vercel)

1. Create account on Vercel
2. Import your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Set environment variables (VITE_API_URL)
6. Deploy

## 🧪 Testing the Application

1. **Register a new user** at `/register`
2. **Browse plans** at `/plans`
3. **Subscribe to a plan**
4. **View your subscription** at `/dashboard`
5. **Toggle dark/light theme** using the theme button
6. **Create an admin user** (via database)
7. **View all subscriptions** at `/admin/subscriptions` as admin

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies support ready
- CORS configuration
- Input validation
- SQL injection prevention (via Knex)
- XSS protection

## 📝 Notes

- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Subscriptions automatically track expiration
- The app includes auto-logout on token expiration
- Admin role must be set manually in the database

## 🤝 Contributing

This is a technical assessment project. For any questions or issues, please contact the developer.

## 📄 License

This project is created for educational/assessment purposes.