import { useContext } from "react";
import { AuthContext } from "../context/AllContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoutes({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return children;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
