import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './Components/Home.jsx';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import MyProfile from './Components/MyProfile.jsx'
import Post from './Components/Post.jsx';
import UserProfile from './Components/UserProfile.jsx';

const App = () => {
  return (
    // <AuthProvider>
      // <UserProvider>
        <Router>
          <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/post" element={<Post />} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Routes>
          </AuthProvider>
        </Router>
      // </UserProvider>
    // </AuthProvider>
  );
};

export default App;
