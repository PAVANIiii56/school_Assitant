# EduFlow AI - School Management Backend

A comprehensive Node.js/Express backend for the AI-Powered School Management SaaS system.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Admin, Teacher, Parent, Student roles
- **Attendance System**: Digital attendance tracking with analytics
- **Fee Management**: Online fee collection with payment integration
- **Exam & Results**: Comprehensive examination and result management
- **AI Insights**: Intelligent analytics for student performance
- **Real-time Communication**: Socket.io for instant messaging
- **Notifications**: Multi-channel notification system

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Real-time**: Socket.io
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and setup**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/school_management
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

3. **Database Setup**:
   ```bash
   # Seed the database with sample data
   node src/seeders/seedData.js
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register     - Register new user
POST /api/auth/login        - User login
GET  /api/auth/me          - Get current user
PUT  /api/auth/profile     - Update profile
PUT  /api/auth/change-password - Change password
POST /api/auth/forgot-password - Forgot password
PUT  /api/auth/reset-password/:token - Reset password
POST /api/auth/logout      - Logout user
```

### Admin Endpoints

```
GET /api/admin/dashboard/stats - Dashboard statistics
GET /api/admin/dashboard/activities - Recent activities
GET /api/admin/dashboard/ai-alerts - AI-generated alerts
GET /api/admin/dashboard/class-performance - Class performance overview
```

## Database Models

### User Model
- Supports all roles: admin, teacher, parent, student
- Role-specific fields (rollNumber for students, subjects for teachers)
- Profile management with preferences
- Password reset functionality

### Class Model
- Class information with teacher assignment
- Subject-teacher mapping
- Student enrollment tracking

### Attendance Model
- Daily attendance tracking
- Multiple status types (present, absent, late, excused)
- Subject and period-wise attendance

### Fee Model
- Multiple fee types (tuition, exam, library, transport)
- Payment tracking with transaction details
- Overdue fee management

### Exam & Result Models
- Comprehensive exam management
- Detailed result tracking with grades
- Performance analytics

### AI Insight Model
- Intelligent student insights
- Recommendation system
- Priority-based alerts

## Demo Accounts

After running the seeder, use these accounts:

```
Admin:   admin@school.edu   / demo123
Teacher: teacher@school.edu / demo123  
Parent:  parent@school.edu  / demo123
Student: student@school.edu / demo123
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Granular permission system
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Comprehensive request validation
- **Password Hashing**: bcrypt for secure password storage
- **CORS Protection**: Cross-origin request security
- **Helmet**: Security headers middleware

## AI Integration

The system includes AI-powered insights:

- **Performance Analysis**: Identifies weak subjects and learning patterns
- **Attendance Monitoring**: Detects attendance issues early
- **Behavioral Insights**: Social and behavioral pattern analysis
- **Predictive Analytics**: Future performance predictions
- **Recommendation Engine**: Personalized improvement suggestions

## File Structure

```
backend/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Route controllers
│   │   ├── auth/       # Authentication controllers
│   │   └── admin/      # Admin-specific controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── utils/          # Utility functions
│   ├── seeders/        # Database seeders
│   └── server.js       # Main server file
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Development

### Available Scripts

```bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
npm test        # Run tests
```

### Adding New Features

1. **Create Model**: Add new Mongoose model in `src/models/`
2. **Add Routes**: Create routes in `src/routes/`
3. **Create Controller**: Add business logic in `src/controllers/`
4. **Add Middleware**: Custom middleware in `src/middleware/`
5. **Update Server**: Register routes in `src/server.js`

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/school_management
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms

- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment
- **AWS**: EC2 with RDS/DocumentDB

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.