
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
    //  localStorage.setItem('token', token); 
    //  localStorage.setItem('role', role); 
  
  
  if (!token) {
    toast.error("Please log in first.");
    return <Navigate to="/login" replace />;
  }

  try {
     jwtDecode(token);
    // const role = response.data.user.role;
    if (allowedRoles.length && !allowedRoles.includes(role)) {
      toast.error("Unauthorized");
      return <Navigate to="/" replace />;
    }
  } catch {
    toast.error("Invalid token");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;