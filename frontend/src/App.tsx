import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer";

const App = () => {
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