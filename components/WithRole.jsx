import { useAuth } from "../context/AuthContext";

const WithRole = ({ children, role }) => {
  const { authState, Role } = useAuth();

  // console.log(role);
  if (authState?.role !== role) {
    return null; // Return `null` instead of an empty fragment for clarity
  }

  return <>{children}</>;
};

export default WithRole;
