const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const recipeControler=require('../../controllers/recipeController')
const { authenticate } = require("../../utils/authentication");

router.get("/getRecipes",authenticate,recipeControler.getRecipes)
router.get("/getRecipe/:id",authenticate,recipeControler.getRecipe)
router.delete("/deleteRecipe/:id",authenticate,recipeControler.delete)
router.post("/createRecipe",authenticate,recipeControler.createRecipe)
router.patch("/editRecipe/:id",authenticate,recipeControler.editRecipe)
router.get("/getRecipeImage/:filename",recipeControler.getRecipeImage)


module.exports =router