import React from "react";
import ReactDOM from "react-dom/client";
import RecipesCard from "../component/RecipesCard";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "../component/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

function Home() {
  const [recipes, setRecipes] = useState([]);

  let location = useLocation();
  let searchQuary = new URLSearchParams(location.search);
  let page = searchQuary.get("page");
  page = parseInt(page) ? parseInt(page) : 1;
  let nagivate = useNavigate();

  const [links, setLinks] = useState(null);

  useEffect(() => {
    let fetchRecipes = async () => {
      let response = await axios(
        "/api/recipes?page=" + page
      );
      console.log(response.status);
      if (response.status === 200) {
        let data = response.data;

        setLinks(data.links);
        setRecipes(data.data);

        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      } else {
        throw new Error("Something went wrong");
      }
    };

    fetchRecipes();
  }, [page]);

  const onDelete = (_id) => {
    if (recipes.length === 1 && page > 1) {
      nagivate("/?page=" + (page - 1));
    } else {
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== _id));
    }
  };
  return (
    <>
        <div className="p-5 grid grid-cols-3 space-x-2 ">
      {!!recipes.length &&
        recipes.map((recipe) => (
          <RecipesCard recipe={recipe} key={recipe._id} onDelete={onDelete} />
        ))}

    </div>
      {!!links && <Pagination links={links} page={page || 1} />}
    </>

  );
}

export default Home;
