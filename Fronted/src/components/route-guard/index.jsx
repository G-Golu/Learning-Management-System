import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  console.log(authenticated, user, "useruser");

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  return <Fragment>{element}</Fragment>;
}

// Add PropTypes validation
RouteGuard.propTypes = {
  authenticated: PropTypes.bool.isRequired, // authenticated must be a boolean and is required
  user: PropTypes.shape({
    role: PropTypes.string.isRequired, // user must have a role property of type string
  }), // user is optional but must have the specified shape if provided
  element: PropTypes.node.isRequired, // element must be a React node and is required
};

export default RouteGuard;
