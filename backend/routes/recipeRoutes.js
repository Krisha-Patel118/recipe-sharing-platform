import express from "express";
import Recipe from "../models/Recipe.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

// Add a recipe
router.post("/", authMiddleware, async (req, res) => {
    const { title, ingredients, instructions, cuisine, image } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions, cuisine, image, user: req.user.id });

    await newRecipe.save();
    res.status(201).json(newRecipe);
});

// Edit a recipe
router.put("/:id", authMiddleware, async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
});

// Delete a recipe
router.delete("/:id", authMiddleware, async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await recipe.remove();
    res.json({ message: "Recipe deleted" });
});

export default router;
