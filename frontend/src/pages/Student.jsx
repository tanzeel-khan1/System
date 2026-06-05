import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

const Student = () => {
  return (
    <div className="flex">
      <StudentSidebar />

      {/* Right Side Content */}
      <main className="flex-1 md:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Student;