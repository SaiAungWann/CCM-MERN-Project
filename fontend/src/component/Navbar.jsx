import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";

export default function Navbar() {
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
        </ul>
      </div>
    </nav>
  );
}
