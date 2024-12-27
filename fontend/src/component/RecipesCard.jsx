import React from "react";
import Ingredient from "./Ingredient";
import axios from "../helpers/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RecipesCard({ recipe, onDelete }) {
  let id = useParams();
  let deleteRecipe = async () => {
    let res = await axios.delete(
      "/api/recipes/" + recipe._id
    );
    if (res.status === 200) {
      onDelete(recipe._id);
    }
  };
  console.log(recipe.recipePhoto);

  return (
    <div className="p-5 bg-white rounded-2xl space-y-5">
      <img className='mx-auto h-64 object-contain' src={import.meta.env.VITE_BACKEND_ACCESS_URL + recipe.recipePhoto} alt="" />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-orange-600">{recipe.title}</h1>
        <div className="flex justify-center space-x-3">
          <Link
            className="text-white text-center bg-slate-500 rounded-lg h-7 w-20"
            to={`/api/recipes/edit/${recipe._id}`}
          >
            Edit
          </Link>
          <button
            className="text-white bg-red-500 rounded-lg h-7 w-20"
            onClick={deleteRecipe}
          >
            Delete
          </button>
        </div>
      </div>
      <p>{recipe.description}</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
      </p>

      <Ingredient ingredients={recipe.ingredients} />

      <div className="text-gray-400 py-1 px-2 ">
        <span>Published at - {recipe.createdAt}</span>
      </div>
    </div>
  );
}
