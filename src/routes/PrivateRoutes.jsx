import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-t-4 border-t-[#dc2626] border-gray-200 rounded-full animate-spin"></div>
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
