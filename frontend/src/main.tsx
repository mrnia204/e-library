import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css';
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages/index.tsx';
import StudentLoginpage from './pages/StudentLogin.tsx';
import AdminLoginpage from './pages/AdminLogin.tsx';
import Admin from './components/admin/Admin.tsx';
import Student from './components/student/Student.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index />},
      { path: "/student-login", element: <StudentLoginpage />},
      { path: "/admin-login", element: <AdminLoginpage />},

      // admin
      {path: "/admin-dashboard", element: <Admin />},
      // student
      {path: '/student-dashboard', element: <Student />}
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
