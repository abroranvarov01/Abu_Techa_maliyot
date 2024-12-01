import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
