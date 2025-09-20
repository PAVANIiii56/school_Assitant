# EduFlow AI - Complete MERN Stack School Management SaaS

A comprehensive, AI-powered school management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application provides role-based dashboards for administrators, teachers, parents, and students with real-time features and AI-driven insights.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Teacher, Parent, Student)
- Password reset functionality
- Secure session management

### 📊 Role-Based Dashboards

#### Admin Dashboard
- School-wide statistics and analytics
- Fee collection monitoring
- Attendance rate tracking
- AI-powered alerts and insights
- Student and teacher management

#### Teacher Dashboard
- Class schedule management
- Attendance marking system
- Grade and exam management
- Student performance tracking
- Parent communication tools

#### Parent Dashboard
- Child's academic progress
- Attendance monitoring
- Fee payment status
- Direct teacher communication
- AI-generated learning insights

#### Student Dashboard
- Personal timetable
- Assignment tracking
- Grade reports
- Achievement badges
- Gamified learning experience

### 🤖 AI-Powered Features
- Performance prediction and analysis
- Attendance pattern recognition
- Personalized learning recommendations
- Early intervention alerts
- Behavioral insights

### 💰 Fee Management
- Online fee collection
- Payment tracking
- Overdue notifications
- Receipt generation
- Multiple payment methods

### 📚 Academic Management
- Exam scheduling and management
- Result publication
- Grade analytics
- Subject-wise performance tracking
- Report card generation

### 💬 Communication System
- Real-time messaging
- Parent-teacher communication
- Announcements and notices
- Push notifications
- Email integration

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom UI Components**
- **Responsive Design**

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time features
- **Nodemailer** for email services
- **Bcrypt** for password hashing

### Development Tools
- **Vite** for fast development
- **ESLint** for code quality
- **TypeScript** for type safety
- **Concurrently** for running multiple processes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management-saas
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   **Frontend (.env)**
   ```bash
   cp .env.example .env
   ```
   
   **Backend (backend/.env)**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Update the backend `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/school_management
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Database Setup**
   ```bash
   # Seed the database with sample data
   npm run backend:seed
   ```

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run full:dev
   
   # Or start individually
   npm run dev              # Frontend only
   npm run backend:dev      # Backend only
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 👥 Demo Accounts

After seeding the database, you can use these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.edu | demo123 |
| Teacher | teacher@school.edu | demo123 |
| Parent | parent@school.edu | demo123 |
| Student | student@school.edu | demo123 |

## 📁 Project Structure

```
school-management-saas/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── auth/               # Authentication components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── layout/             # Layout components
│   │   └── ui/                 # Reusable UI components
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API services
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── backend/                     # Backend source code
│   ├── src/
│   │   ├── config/             # Database and app configuration
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # Express routes
│   │   ├── utils/              # Utility functions
│   │   ├── seeders/            # Database seeders
│   │   └── server.js           # Main server file
│   └── package.json            # Backend dependencies
├── public/                      # Static assets
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev                 # Start development server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run ESLint

# Backend
npm run backend:dev        # Start backend development server
npm run backend:seed       # Seed database with sample data

# Full Stack
npm run full:dev          # Start both frontend and backend
npm run setup             # Install backend deps and seed database
```

### Adding New Features

1. **Frontend Components**: Add new components in `src/components/`
2. **API Services**: Extend `src/services/api.ts`
3. **Backend Routes**: Add routes in `backend/src/routes/`
4. **Database Models**: Create models in `backend/src/models/`
5. **Types**: Define TypeScript types in `src/types/`

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Dark Mode Support**: Toggle between light and dark themes
- **Smooth Animations**: Micro-interactions and transitions
- **Accessibility**: WCAG compliant components
- **Loading States**: Skeleton loaders and progress indicators

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Cross-origin request security
- **Helmet Security**: Security headers middleware

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Environment Variables**
   Set `VITE_API_BASE_URL` to your backend URL

### Backend Deployment (Railway/Heroku)

1. **Prepare for deployment**
   ```bash
   cd backend
   npm install
   ```

2. **Set environment variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_jwt_secret
   FRONTEND_URL=your_frontend_domain
   ```

3. **Deploy to Railway**
   ```bash
   npm install -g @railway/cli
   railway login
   railway deploy
   ```

## 📊 AI Features Implementation

The system includes several AI-powered features:

### Performance Analytics
- Student performance prediction
- Subject-wise weakness identification
- Learning pattern analysis
- Improvement recommendations

### Attendance Monitoring
- Attendance pattern recognition
- Early warning system for poor attendance
- Automated parent notifications
- Intervention recommendations

### Behavioral Insights
- Social interaction analysis
- Engagement level tracking
- Behavioral pattern identification
- Personalized motivation strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@eduflow-ai.com
- Documentation: [Wiki](link-to-wiki)

## 🎯 Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced AI features (ML models)
- [ ] Integration with external LMS
- [ ] Multi-language support
- [ ] Advanced reporting and analytics
- [ ] Video conferencing integration
- [ ] Blockchain-based certificates

---

**EduFlow AI** - Transforming education through intelligent technology 🎓✨