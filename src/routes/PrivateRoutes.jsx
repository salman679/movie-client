import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
}

// Correct PropTypes definition
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
