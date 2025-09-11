import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RouteProtector({ children, isAuthPage = false }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("RouterProtector confirmation:", isLoggedIn);

  if (isAuthPage && isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If it's a private/protected page AND user is NOT logged in → redirect to login
  if (!isAuthPage && !isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RouteProtector;
