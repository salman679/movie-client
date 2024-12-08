import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import PropTypes from "prop-types";

export default function PrivateRoutes({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return children;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
