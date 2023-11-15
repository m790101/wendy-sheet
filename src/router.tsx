import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";





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
        element: <App />,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          {
            path: "home",
            element:  <Home />,
          },
          { path: "*", element: <Navigate to="home" replace /> },
        ],
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/error",
        element: <Error />,
      },
      { path: "*", 
      element: <Navigate to="login" replace /> 
      },
    ],
  },
]);

export default router;