import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

export default function PrivateRoutes({ children }) {
  const { user, loading } = useContext(AuthContext); // Assuming `loading` indicates authentication status loading
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return user ? children : null;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
