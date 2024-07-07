import React from "react";
import plus from "../assets/plus.svg";
import { useState } from "react";
import Ingredient from "../component/Ingredient";
import axiao from "axios";
import { useNavigate } from "react-router-dom";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState([]);

  let addNweIngredient = () => {
    setIngredients((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

  let createRecipe = async (e) => {
    try {
      e.preventDefault();
      let recipe = {
        title,
        description,
        ingredients,
      };
      console.log(recipe);

      let res = await axiao.post("http://localhost:4000/api/recipes", recipe);
      if (res.status === 200) {
        navigate("/");
      }
      console.log(res);
    } catch (e) {
      setError(Object.keys(e.response.data.error));
      // console.log(Object.keys(e.response.data.error));
    }
  };

  return (
    <div className="p-5 border-4 border-white rounded-2xl mt-5 space-y-6">
      <h1 className="text-3xl font-bold text-orange-400">Recipe Create Form</h1>
      <form action="" className="space-y-3" onSubmit={createRecipe}>
        <input
          type="text"
          placeholder="Please enter recipe title"
          className="w-full p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ul className="text-red-500 list-disc pl-5">
          {!!error.length &&
            error
              .filter((err) => err.includes("title"))
              .map((err, i) => <li key={i}>{err} is invailt value </li>)}
        </ul>

        <textarea
          rows={5}
          type="text"
          placeholder="Description"
          className="w-full p-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ul className="text-red-500 list-disc pl-5">
          {!!error.length &&
            error
              .filter((err) => err.includes("description"))
              .map((err, i) => <li key={i}>{err} is invailt value </li>)}
        </ul>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Please enter ingretience title"
            className="w-full p-1"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <img
            src={plus}
            alt=""
            className="cursor-pointer size-11"
            onClick={addNweIngredient}
          />
        </div>
        <div className="flex flex-wrap">
          <Ingredient ingredients={ingredients} />
        </div>

        <ul className="text-red-500 list-disc pl-5">
          {!!error.length &&
            error
              .filter((err) => err.includes("ingredients"))
              .map((err, i) => (
                <li key={i}>{err} must have at lease one value </li>
              ))}
        </ul>

        <button
          type="submit"
          className="w-full px-3 py-1 rounded-full bg-orange-400 text-white"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
