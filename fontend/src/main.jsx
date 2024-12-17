import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "../routers/router";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthContextProvider> 
    <RouterProvider router={router} />
  </AuthContextProvider>
);
