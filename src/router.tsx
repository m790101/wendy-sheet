import {
    createBrowserRouter,
  } from "react-router-dom";
  import App from "./App";
  import Home from "./pages/Home/Home";
  import Error from "./pages/Error/Error";
  
  
  
  
  const router = createBrowserRouter([
    {
      path: "",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/error",
          element: <Error />,
        }
      ],
    },
  ]);
  
  export default router;