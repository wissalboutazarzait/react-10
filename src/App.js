import React, { useState } from "react";
import axios from "axios";
import "./App.css"; 

const App = () => {
  const [query, setQuery] = useState(""); 
  const [recipes, setRecipes] = useState([]); 
  const [error, setError] = useState(""); 

  const API_KEY = "1"; 
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`;

  const fetchRecipes = async () => {
    try {
      if (!query) {
        setError("Veuillez entrer un ingrédient.");
        return;
      }

      const response = await axios.get(URL);

      if (!response.data.meals) {
        setError("Aucune recette trouvée pour cet ingrédient.");
        setRecipes([]); 
      } else {
        setRecipes(response.data.meals);
        setError(""); 
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
      setError("Erreur lors de la récupération des données.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    fetchRecipes(); 
  };

  return (
    <div className="App">
      <h1>Recherche de Recettes</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  
          placeholder="Entrez un ingrédient (ex: pomme)"
        />
        <button className="search-button" type="submit">Rechercher</button>
      </form>

      {}
      {error && <div className="error">{error}</div>}

      {}
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.strMeal}</h3>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
              <a
                href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir la recette
              </a>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default App;
