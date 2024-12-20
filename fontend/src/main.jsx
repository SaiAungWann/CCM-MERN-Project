import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import Routes from "./routers/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthContextProvider> 
    <Routes />
    {/* <RouterProvider router={Routes} /> */}
  </AuthContextProvider>
);
