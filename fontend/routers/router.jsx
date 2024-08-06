import { createBrowserRouter } from "react-router-dom";
import Layout from "../src/component/Layout";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import RecipeForm from "../src/pages/RecipeForm";
import SignInForm from "../src/pages/SignInForm";
import SignUpForm from "../src/pages/SignUpForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/recipes/create",
        element: <RecipeForm />,
      },
      {
        path: "/recipes/edit/:id",
        element: <RecipeForm />,
      },
            {
        path: "/sign-in", //http://localhost:5173/sign-in
        element: <SignInForm />
      },
      {
        path: "/sign-up", //http://localhost:5173/sign-up
        element: <SignUpForm />
      },
    ],
  },
]);

export default router;
