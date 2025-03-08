import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const API_URL = "http://localhost:5000/api"; // Change this when deploying

fetch(`${API_URL}/recipes`)
  .then(response => response.json())
  .then(data => console.log(data)); // Update this to display recipes

function Home() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultRecipes = [
      { id: 1, title: 'Undhiyu', cuisine: 'Gujarati Dish', ingredients: ['Potato', 'Yam', 'Spices'], instructions: 'Slow cook mixed vegetables and spices.', image: '/images/undhiyu.jpg' },
      { id: 2, title: 'Masala Dosa', cuisine: 'South Indian', ingredients: ['Dosa batter', 'Potatoes'], instructions: 'Crispy dosa with spiced potato filling.', image: '/images/masala_dosa.jpg' }
    ];

    let userRecipes = JSON.parse(localStorage.getItem('userRecipes'));
    if (!userRecipes) {
      // Only set default recipes if localStorage is empty
      localStorage.setItem('userRecipes', JSON.stringify(defaultRecipes));
      userRecipes = defaultRecipes;
    }
    setRecipes(userRecipes);
  }, []);

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
  };

  const handleEdit = (id) => {
    navigate(`/add-recipe?id=${id}`);
  };

  return (
    <div className="container">
      <h1>Indian Recipe Collection</h1>
      <div className="recipe-list">
      {recipes.map((recipe, index) => (
  <div key={`${recipe.id}-${index}`} className="recipe-card">  {/* Unique key by combining id & index */}
    <div className="menu top-right">
      <span onClick={() => handleEdit(recipe.id)}>✏️</span>
      <span onClick={() => handleDelete(recipe.id)}>🗑️</span>
    </div>
    {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-image" />}
    <h2>{recipe.title}</h2>
    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
    <Link to={`/recipe/${recipe.id}`}><button>View Details</button></Link>
  </div>
))}
</div>
    </div>
  );
}

export default Home;
