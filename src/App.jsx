import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SelesctRPage from "./pages/SelesctRPage";
import BusinessOwnerRegisterPage from "./pages/BusinessOwnerRegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PostsPage from "./pages/PostsPage";
import CreatePostPage from "./pages/PostsPage/CreatePost";
import ViewPosts from "./pages/PostsPage/ViewPosts";
// import UpdateUser from "./pages/UpdateUser";

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
          {/* <Route path="update" element={<UpdateUser />} /> */}
        </Route>
        <Route path="/posts" element = {<PostsPage />} />
        <Route path="/posts/:id" element = {<ViewPosts />} />
        <Route path="/create-post" element = {<CreatePostPage />} />
      </Routes>
    </div>
  );
};

export default App;
