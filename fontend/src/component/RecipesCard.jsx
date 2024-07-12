import React from "react";
import Ingredient from "./Ingredient";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function RecipesCard({ recipe, onDelete }) {
  let id = useParams();
  let deleteRecipe = async () => {
    let res = await axios.delete(
      "http://localhost:4000/api/recipes/" + recipe._id
    );
    if (res.status === 200) {
      onDelete(recipe._id);
    }
  };

  return (
    <div className="p-5 bg-white rounded-2xl mt-5 space-y-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-orange-600">{recipe.title}</h1>
        <button
          className="text-white bg-red-500 rounded-lg h-7"
          onClick={deleteRecipe}
        >
          Delete
        </button>
      </div>
      <p>{recipe.description}</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi rem
        debitis repellat hic id ipsa vel aliquam, facere repudiandae voluptatum
        ab ullam harum? Officiis, pariatur? Vitae quasi dignissimos omnis
        perferendis.
      </p>

      <Ingredient ingredients={recipe.ingredients} />

      <div className="text-gray-400 py-1 px-2 ">
        <span>Published at - {recipe.createdAt}</span>
      </div>
    </div>
  );
}
