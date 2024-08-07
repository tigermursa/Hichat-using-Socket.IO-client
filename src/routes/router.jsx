import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Conversation from "../Pages/ConversationPage/Conversation";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import { AuthProvider } from "../Lib/AuthContext/AuthContext";
import PrivateRoute from "../Lib/Provider/PrivateRoute";
import Mentors from "../Pages/MentorPage/Mentors";
import Profile from "../Pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Mentors />
          </PrivateRoute>
        ),
      },
      {
        path: "/conversation/:mentorId",
        element: (
          <PrivateRoute>
            <Conversation />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
