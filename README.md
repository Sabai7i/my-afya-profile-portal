# My Afya Profile Portal

A comprehensive patient data management system for healthcare practitioners, allowing secure access to patient information across multiple healthcare facilities.

## Features

- Secure user authentication and authorization
- Role-based access control (Admin, Doctor, Nurse, Staff)
- Patient profile management
- Medical history tracking
- Search and filter capabilities
- Responsive design
- RESTful API architecture

## Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - Express Validator

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-afya-profile-portal.git
cd my-afya-profile-portal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myafyaprofile
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

### Patients
- `GET /api/patients` - Get all patients (paginated)
- `GET /api/patients/:id` - Get single patient
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `POST /api/patients/:id/medical-history` - Add medical history
- `GET /api/patients/search` - Search patients

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- CORS protection
- Helmet security headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@myafyaprofile.com or open an issue in the repository. 