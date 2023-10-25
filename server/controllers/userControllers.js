const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

router.get("/allUsers/:username", async (req,res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    res.json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

router.post("/addUsers", (req,res) => {
  const { name, username, password, birthday } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const newUser = new User ({
    name: name,
    username: username,
    password: password,
    birthday: birthday,
  });

  newUser.save((err, result) => {
    if (err) {
      console.error('Failed to add user:', err);
      return res.status(500).json({ success: false, message: "Failed to add user" });
    } else {
      return res.status(200).json({ success: true, message: "Successfully added user", data: result });
    }
  });
});

router.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  User.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.error('Failed to delete user:', err);
      return res.status(500).json({ success: false, message: "Failed to delete user" });
    } else {
      return res.status(200).json({ success: true, message: "User deleted successfully" });
    }
  });
});

router.put("/UpdateUser/:id", (req, res) => {
  const { id } = req.params;
  const { name, username, password, birthday } = req.body;

  if (!id || !name || !username || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const updateData = {
    name: name,
    username: username,
    password: password,
    birthday: birthday,
  };

  User.findByIdAndUpdate(id, { $set: updateData }, (err, doc) => {
    if (err) {
      console.error('Failed to update user:', err);
      return res.status(500).json({ success: false, message: "Failed to update user" });
    } else if (!doc) {
      return res.status(404).json({ success: false, message: "No user found" });
    } else {
      return res.status(200).json({ success: true, message: "Updated successfully", data: doc });
    }
  });
});

module.exports = router;

module.exports = router;
