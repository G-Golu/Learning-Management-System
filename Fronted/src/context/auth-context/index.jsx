import { createContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

// Define PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // `children` should be a React node and is required
};
