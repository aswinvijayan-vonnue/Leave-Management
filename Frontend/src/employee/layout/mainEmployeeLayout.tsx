import Header from "../../components/header";
import { Outlet } from "react-router-dom";

const MainEmployeeLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainEmployeeLayout;
