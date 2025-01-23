import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SelesctRPage from "./pages/SelesctRPage";
import BusinessOwnerRegisterPage from "./pages/BusinessOwnerRegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateUser from "./pages/UpdateUser";
import PostForm from "./pages/PostsPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register-select" element={<SelesctRPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/business-owner-register" element={<BusinessOwnerRegisterPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          {/* Nested route for UpdateUser */}
          <Route path="update" element={<UpdateUser />} />
        </Route>
        <Route path="/posts" element={<PostForm />} />
      </Routes>
    </div>
  );
};

export default App;
