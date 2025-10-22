import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./pages/Footer";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on app start
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      // User not found
      navigate("/");
    } else {
      // user exists, parse and check role
      try {
        const user = JSON.parse(userStr);
        if(user.role === 'admin'){
          navigate("/admin-login");
        } else if (user.role === 'student') {
          navigate("/student-login");
        } 
        // if role doesn't match stay on the current page
      } catch (error) {
        console.error("Error parsing user date", error);
        localStorage.removeItem('user'); // clear invalid data
        navigate("/");
      }
    }
   
  },[navigate]);

  return ( 
    <div>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
 
export default App;