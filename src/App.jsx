import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SelesctRPage from "./pages/SelesctRPage";
import BusinessOwnerRegisterPage from "./pages/BusinessOwnerRegisterPage";
// import ProfilePage from "./pages/ProfilePage";
const ProfilePage = lazy(()=>import("./pages/ProfilePage"));
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
// import PostsPage from "./pages/PostsPage";
const PostsPage = lazy(()=>import("./pages/PostsPage"));
import EditPost from "./pages/PostsPage/EditPost";
import CreatePostPage from "./pages/PostsPage/CreatePost";
import ViewPosts from "./pages/PostsPage/ViewPosts";
import VerifyAccount from "./pages/VerifyAccount";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard";
import UserProfile from "./components/UserProfile";
import OtherUserProfilePage from "./pages/OtherUserProfilePage";
import { UserProvider } from "./context/context";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import RequireAuth from "./Auth/RequireAuth";
import TransActions from "./pages/PostsPage/TransActions";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Notifications from "./pages/PostsPage/Notifications";
import GoogleSignUpPage from "./pages/GoogleSignUpPage";
// import Notifications from "./pages/PostsPage/Notifications";


// import UpdateUser from "./pages/UpdateUser";

const App = () => {
  
  return (
    <UserProvider>
      <div className="scroll-smooth font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/googleSignUp" element={<GoogleSignUpPage />} />
          <Route path="/register" element={<SelesctRPage />} />
          <Route path="/user-register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/business-owner-register" element={<BusinessOwnerRegisterPage />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<OtherUserProfilePage />} />
          <Route path="/profile/update" element={<UpdateProfilePage />} />
          <Route path="/profile/update-password" element={<UpdatePasswordPage />} />
          <Route path="/otherUser/account/:id" element={<UserProfile />} /> {/* Fixed the issue */}
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id" element={<ViewPosts />} />
          <Route path="/editPost/:id" element={<EditPost />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route element = {<RequireAuth />}>
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/transactions" element={<TransActions />} />
          </Route>
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/user/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} /> {/* Handles all unknown routes */}
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
