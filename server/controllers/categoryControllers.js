const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
// import {ecommerce} from "../Ecommerce.category.json"

const {ecommerce} = require("../Ecommerce.category.json") 
console.log(ecommerce)
// API routes for CRUD operations
router.post("/", async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json(category);
});

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
});
// update category
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(category);
});

router.delete("/:id", async (req, res) => {
  await Category.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
});

// async function fetchDataFromAPI(apiURL) {
//   try {
//       const response = await fetch(apiURL);
//       const data = await response.json();
//       return data.categories;
//   } catch (error) {
//       console.error("Error fetching data from the API:", error);
//       return [];
//   }
// }

// // Function to filter subcategories by category name
// function filterSubcategories(categoryName, categoriesArray) {
//   const category = categoriesArray.find(cat => cat.name === categoryName);
//   return category ? category.subcategories : [];
// }


// const apiURL = " http://localhost:3000/categories"; // Replace with your API URL
// const categoryName = "Category A";

// fetchDataFromAPI(apiURL)
//   .then(categories => {
//       const filteredSubcategories = filterSubcategories(categoryName, categories);
//       console.log(filteredSubcategories);
//   })
//   .catch(error => {
//       console.error(error);
//   });



module.exports = router;
