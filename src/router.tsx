import {
    createBrowserRouter,
  } from "react-router-dom";
  import App from "./App";
  import Home from "./pages/Home/Home";
import Db from "./pages/Db";
  
  
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/db",
          element: <Db />,
        },
      ],
    },
  ]);
  
  export default router;