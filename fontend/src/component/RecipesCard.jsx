import React from "react";
import Ingredient from "./Ingredient";

export default function RecipesCard({ recipe }) {
  return (
    <div className="p-5 bg-white rounded-2xl mt-5 space-y-5">
      <h1 className="text-3xl font-bold text-orange-600">{recipe.title}</h1>
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
