import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import PropTypes from "prop-types";

export default function PrivateRoutes({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>loading</p>;
  }

  return children;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
