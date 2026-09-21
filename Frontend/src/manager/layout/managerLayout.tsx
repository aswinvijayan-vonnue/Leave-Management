import Sidebar from "../component/sidebar";
import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default ManagerLayout;
