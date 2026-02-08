import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Check if user is logged in AND is admin
  if (user && user.role === "admin") {
    return <Outlet />;
  }

  // Redirect to login if not admin (or not logged in)
  // Optionally could redirect to 404 or home to hide existence of admin area
  return <Navigate to="/login" replace />;
};

export default AdminRoute;
