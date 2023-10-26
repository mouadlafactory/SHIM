const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// API routes for CRUD operations
router.post("/api/categories", async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json(category);
});

router.get("/api/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.get("/api/categories/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
});
// update category
router.put("/api/categories/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(category);
});

router.delete("/api/categories/:id", async (req, res) => {
  await Category.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
