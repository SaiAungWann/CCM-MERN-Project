import React from "react";
import plus from "../assets/plus.svg";
import { useState } from "react";
import Ingredient from "../component/Ingredient";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function RecipeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState([]);

  let id = useParams().id;
  useEffect(() => {
    let fetchRecipe = async () => {
      console.log(id);
      if (id) {
        let res = await axios.get("/api/recipes/" + id);
        if (res.status === 200) {
          console.log(res.data);
          setPreview(import.meta.env.VITE_BACKEND_URL + res.data.recipePhoto);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  let addNweIngredient = () => {
    setIngredients((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

  let submit = async (e) => {
    try {
      e.preventDefault();
      let recipe = {
        title,
        description,
        ingredients,
      };
      console.log(recipe);

      let res;
      if (id) {
        res = await axios.patch(
          "/api/recipes/" + id,
          recipe
        );
      } else {
        res = await axios.post("/api/recipes", recipe);
      }

      // upload image
      let formData = new FormData();
      formData.set('recipePhoto', file);
      console.log(res.data)
      let uploadRes = await axios.post(`/api/recipes/${res.data._id}/upload`, formData, 
        {headers: {'Accept': 'multipart/form-data'}});
      if (res.status === 200) {
        navigate("/");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
      // setError(Object.keys(e.response.data.error));

    }
  };

  let upload = (e) => {
    //set file
    let file = e.target.files[0];
    setFile(file);
    // preview
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className="p-5 border-4 border-white rounded-2xl mt-5 space-y-6">
      <h1 className="text-3xl font-bold text-orange-400 text-center">
        Recipe {id ? "Edit" : "Create"} Form
      </h1>
      <form action="" className="space-y-3" onSubmit={submit}>
        <input type="file" onChange={upload}/>
        {preview && <img src={preview} alt="" />}
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
          {id ? "Edit" : "Create"} Recipe
        </button>
      </form>
    </div>
  );
}
