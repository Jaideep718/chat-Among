# Chat Among

A modern full-stack chat application built with **React**, **Express**, **MongoDB**, and **Socket.io**.  
Supports real-time messaging, authentication, user profiles, and responsive UI.

---

## Features

- 🔒 **Authentication**: Sign up, login, and secure user sessions.
- 💬 **Real-time Chat**: Instant messaging powered by Socket.io.
- 👤 **User Profiles**: View and update user information.
- 🎨 **Modern UI**: Responsive design with custom backgrounds and avatars.
- 🌐 **CORS Support**: Works seamlessly in local and production environments.
- ☁️ **Cloudinary Integration**: For profile images and media (if enabled).

---

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios, React Hot Toast
- **Backend**: Express, MongoDB (Mongoose), Socket.io, Cloudinary
- **Deployment**: Vercel (frontend & backend), MongoDB Atlas

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jaideep718/chat-among.git
cd chat-among
```

### 2. Setup Environment Variables

#### Backend (`server/.env`)
```
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend (`client/.env`)
```
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 4. Run Locally

#### Backend
```bash
npm run dev
```

#### Frontend
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

### Vercel

- Import both `client` and `server` folders as separate projects in Vercel.
- Set environment variables in Vercel dashboard for both frontend and backend.
- Update `VITE_BACKEND_URL` in frontend `.env` to your deployed backend URL.

---

## Folder Structure

```
chat-app/
├── client/
│   ├── src/
│   ├── public/
│   ├── context/
│   ├── components/
│   ├── pages/
│   └── ...
├── server/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── ...
```

---

## Troubleshooting

- **CORS Errors**: Ensure both local and deployed origins are allowed in backend CORS config.
- **MongoDB Auth Errors**: Double-check your MongoDB URI and credentials.
- **Socket.io Issues**: Make sure backend is running and accessible from frontend.

---

## License

MIT

---

## Credits

Built by [Reddy Jaideep](https://github.com/Jaideep718).
