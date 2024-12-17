import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function Navbar() {

  let { userName, email } = useContext(AuthContext);
  console.log(userName , email);

  return (

    <nav className="flex justify-between items-center p-5 bg-white">
      <div>
        <h1 className="text-4xl font-bold text-orange-600 underline">
          Recipes
        </h1>
      </div>

      <div className="flex items-center justify-between space-x-5">
        <ul className="flex justify-between space-x-5 p-5 text-xl font-bold">
          <li className="text-xl">
            <Link to="/" className="hover:text-orange-600 ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-600">
              About us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-600">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/recipes/create" className="hover:text-orange-600">
              Create
            </Link>
          </li>
          <li>
            <Link to="/sign-in" className="hover:text-orange-600">
              LogIn
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className="hover:text-orange-600">
              SignUp
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
