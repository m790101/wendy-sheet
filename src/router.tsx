import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import HomeLayout from "./pages";





const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, element: <Navigate to="/login" replace />
      },
      {
        path: "login",
        element:<Login/>,
      },
      {
        path: "main",
        element: <HomeLayout/>,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          {
            path: "home",
            element:  <Home />,
          },
          { path: "*", element: <Navigate to="home" replace /> },
        ],
      },
      { path: "*", 
      element: <Navigate to="/" replace /> 
      },
    ],
  },
]);

export default router;