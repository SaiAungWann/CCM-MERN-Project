
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "../component/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import RecipeForm from "../pages/RecipeForm";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";

import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";

export default function Index() {
  
  let { user } = useContext(AuthContext); 


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: user ? <Home /> : <Navigate to="/sign-in" />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/api/recipes/create",
        element: user ? <RecipeForm /> : <Navigate to="/sign-in" />,
      },
      {
        path: "/api/recipes/edit/:id",
        element: <RecipeForm />,
      },
      {
        path: "/sign-in", //http://localhost:5173/sign-in
        element: !user ? <SignInForm /> : <Navigate to="/" />,
      },
      {
        path: "/sign-up", //http://localhost:5173/sign-up
        element: !user ? <SignUpForm /> : <Navigate to="/" />,
      },
    ],
  },
]);
return (
    <RouterProvider router={router} />
  )
}
