import React from "react";
import ReactDOM from "react-dom/client";
import RecipesCard from "../component/RecipesCard";
import { useEffect } from "react";
import { useState } from "react";
function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let fetchRecipes = async () => {
      let respond = await fetch("http://localhost:4000/api/recipes");
      if (respond.ok) {
        let data = await respond.json();
        setRecipes(data);
        console.log(data);
      } else {
        throw new Error("Something went wrong");
      }
    };

    fetchRecipes();
  }, []);
  return (
    <div className="p-5">
      {!!recipes.length &&
        recipes.map((recipe) => (
          <RecipesCard recipe={recipe} key={recipe._id} />
        ))}
    </div>
  );
}

export default Home;
