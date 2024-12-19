import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  // Wait for the user to be set before redirecting
  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
