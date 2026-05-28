# Create README file
echo "# Share Your Thoughts - MERN Stack Social Platform

A full-stack web application where users can share their thoughts, experiences, and special life events. Users can like, comment, and interact with posts.

## 🌟 Features

- **User Authentication**: Register/Login with JWT tokens
- **Post Management**: Create, read, update, and delete posts
- **Likes System**: Any user can like posts (even without login)
- **Comments**: Registered users can comment on posts
- **User Profiles**: Unique usernames and profile photos
- **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/share-your-thoughts.git
cd share-your-thoughts
\`\`\`

### 2. Install Backend Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

### 3. Configure Environment Variables
Create a \`.env\` file in the backend folder:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/share-your-thoughts
JWT_SECRET=your_super_secret_key
PORT=5000
\`\`\`

### 4. Install Frontend Dependencies
\`\`\`bash
cd ../frontend
npm install
\`\`\`

### 5. Run the Application

#### Backend (from backend folder)
\`\`\`bash
npm run dev
\`\`\`

#### Frontend (from frontend folder)
\`\`\`bash
npm start
\`\`\`

The app will open at http://localhost:3000

## 📁 Project Structure

\`\`\`
share-your-thoughts/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── public/
└── README.md
\`\`\`

## 🔒 Environment Variables

### Backend (.env)
- \`MONGODB_URI\`: MongoDB connection string
- \`JWT_SECRET\`: Secret key for JWT tokens
- \`PORT\`: Server port (default: 5000)

## 🤝 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/posts | Get all posts | No |
| POST | /api/posts | Create post | Yes |
| PUT | /api/posts/like/:id | Like/unlike post | Yes |
| POST | /api/posts/comment/:id | Add comment | Yes |
| PUT | /api/posts/:id | Update post | Yes (owner) |
| DELETE | /api/posts/:id | Delete post | Yes (owner) |

## 📸 Screenshots

[Add screenshots here after deployment]

## 🐛 Known Issues

- Avatar images require valid URLs or use default avatar
- No image upload feature (planned for v2)

## 🚀 Future Enhancements

- Image upload for posts
- Email notifications
- Post pagination
- Search functionality
- User following system
- Private messaging

## 👨‍💻 Author

[Your Name] - [Your GitHub Profile]

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- React.js community
- Node.js developers

## 📧 Contact

leninandinisahoo123@gmail.com - for any queries or suggestions
" > README.md