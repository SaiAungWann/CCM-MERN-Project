import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto p-5">
        <Outlet />
      </div>
    </>
  );
}
