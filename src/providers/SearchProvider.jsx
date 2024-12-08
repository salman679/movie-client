import { useState } from "react";
import { SearchContext } from "../context/SearchContext";
import PropTypes from "prop-types";

export default function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node,
};
