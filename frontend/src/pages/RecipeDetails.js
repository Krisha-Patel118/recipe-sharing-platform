import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
    const selectedRecipe = allRecipes.find((r) => r.id.toString() === id);
    if (selectedRecipe) setRecipe(selectedRecipe);
    else navigate('/');
  }, [id, navigate]);

  if (!recipe) return <p>Loading recipe details...</p>;

  return (
    <div className="container">
      <h2>{recipe.title}</h2>
      {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-image-large" />}
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetails;
