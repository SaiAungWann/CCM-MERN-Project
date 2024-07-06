import React from "react";

export default function RecipesCard({ recipe }) {
  return (
    <div className="p-5 bg-white rounded-2xl mt-5">
      <h1 className="text-3xl font-bold text-orange-600">{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi rem
        debitis repellat hic id ipsa vel aliquam, facere repudiandae voluptatum
        ab ullam harum? Officiis, pariatur? Vitae quasi dignissimos omnis
        perferendis.
      </p>

      <div className="space-x-3">
        <span>ingredients - </span>
        <span className="text-white bg-orange-400 rounded-xl py-1 px-2 ">
          {recipe.ingredients}
        </span>
      </div>
      <div className="text-gray-400 py-1 px-2 ">
        <span>Published at - {recipe.createAT}</span>
      </div>
    </div>
  );
}
