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
import VerifyAccount from "./pages/VerifyAccount";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard";
import UserProfile from "./components/UserProfile";
import { PostProvider } from "./context/context";

const App = () => {
  return (
    <PostProvider>
      <div className="scroll-smooth">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register-select" element={<SelesctRPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/business-owner-register" element={<BusinessOwnerRegisterPage />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/account/:id" element={<UserProfile />} /> {/* Fixed the issue */}
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<ViewPosts />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} /> {/* Handles all unknown routes */}
        </Routes>
      </div>
    </PostProvider>
  );
};

export default App;
