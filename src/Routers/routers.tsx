import Login from "../Pages/Login/login";
import Home from "../Pages/Home/home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/main-layout";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Routers;
