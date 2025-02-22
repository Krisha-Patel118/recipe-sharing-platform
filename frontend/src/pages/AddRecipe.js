import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const recipeId = params.get('id');

  useEffect(() => {
    if (recipeId) {
      const userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
      const recipeToEdit = userRecipes.find((r) => r.id.toString() === recipeId);
      if (recipeToEdit) {
        setTitle(recipeToEdit.title);
        setIngredients(recipeToEdit.ingredients.join(', '));
        setInstructions(recipeToEdit.instructions);
        setCuisine(recipeToEdit.cuisine);
        setImage(recipeToEdit.image || '');
      }
    }
  }, [recipeId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
    const newId = Date.now(); // Unique ID based on timestamp
  
    if (recipeId) {
      const updatedRecipes = userRecipes.map((r) =>
        r.id.toString() === recipeId
          ? { ...r, title, ingredients: ingredients.split(','), instructions, cuisine, image: `/images/${image}` }
          : r
      );
      localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
    } else {
      const newRecipe = {
        id: newId, // Ensure unique ID
        title,
        ingredients: ingredients.split(','),
        instructions,
        cuisine,
        image: `/images/${image}`,
      };
      localStorage.setItem('userRecipes', JSON.stringify([...userRecipes, newRecipe]));
    }
    navigate('/');
  };
  

  return (
    <div className="form-container">
      <h2>{recipeId ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Image Filename (e.g., undhiyu.jpg)" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Ingredients (comma-separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <input type="text" placeholder="Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} required />
        <button type="submit">{recipeId ? 'Update Recipe' : 'Add Recipe'}</button>
      </form>
    </div>
  );
}

export default AddRecipe;
