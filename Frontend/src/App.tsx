import { Route, Routes } from "react-router-dom";
import MainEmployeeLayout from "./employee/layout/mainEmployeeLayout";
import EmployeeDashBoard from "./employee/pages/employeeDashBoard";
import LeaveRequest from "./employee/components/requestForm";
import ProfilePage from "./pages/profilePage";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<MainEmployeeLayout />}>
        <Route path="/" element={<EmployeeDashBoard />}></Route>
        <Route path="/request" element={<LeaveRequest />}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
