import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Overview from "./Overview";
import StudentManagement from "./Studentmanagement";
import AnalyticsDashboard from "./Analytics";
import Reports from "./Reports";
import { useAsyncValue, useNavigate } from "react-router-dom";

import { useLogout } from "@/hooks/useLogout";
import { useActivityTracker } from "@/hooks/useActivityTracker";



const views = [
  { view: "Overview", icon: "ri-dashboard-line"},
  { view: "Student Management", icon: "ri-group-line"},
  { view: "Analytics", icon: "ri-bar-chart-line"},
  { view: "Reports", icon: "ri-file-chart-line"},
]; 

// Mock data for charts

const Admin = () => {
  useAsyncValue(); // this tracks time automatically
  const [active, setActive] = useState("Overview");

  const { logout } = useLogout();
  useActivityTracker(); // this will auto-update time spent

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/admin-login"); // not logged in
    } else {
      const parsed = JSON.parse(user);
      if (parsed.role !== "admin") {
        navigate("/student-login"); //wrong role
      }
    }
  },[navigate]) 


  return (
    <div className="min-h-screen bg-gray-50">
      {/** Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="wrapper">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-graduation-cap-fill text-white text-xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
                <p className="text-sm text-gray-600">School eLibrary System </p>
                <Button onClick={logout} className="bg-red-500 text-white px4 py-3 rounded hover:bg-red-600n">Logout</Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2">
                <i className="ri-download-line mr-2"></i>Export Data
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <i className="ri-user-fill text-gray-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/** Nvigation Tabs */}
      <nav className="wrapper mt-8 border-b border-gray-200">
        <div className="flex space-x-6">
          {views.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActive(tab.view)}
              className={`flex items-center space-x-2 text-sm font-medium border-b-2 transition-all duration-150 ${
                active === tab.view 
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <i className={`${tab.icon}`}></i>
              <span>{tab.view}</span>
            </button>
          ))}
        </div>
      </nav>

      {/** Content */}
      <main className="wrapper py-8 space-y-8">
        { active === "Overview" && <Overview />}  {/** Overview Cards */}
        { active === "Student Management" && <StudentManagement />}  {/** Student Management Cards */}
        { active === "Analytics" && <AnalyticsDashboard />}  {/** Analytics Cards */}
        { active === "Reports" && <Reports />}  {/** Reports Cards */}
      </main>
    </div>
  );
}
 
export default Admin;

