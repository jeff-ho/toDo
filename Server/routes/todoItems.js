const express = require("express");
const router = express.Router();

const todoItemsModel = require("../models/toDoItems");

//Add item to to do list
router.post("/api/item", async (req, res) => {
  try {
    const newToDoItem = new todoItemsModel({
      item: req.body.item,
    });

    await newToDoItem.save();
    res.status(200).json("Item added successfully");
  } catch (err) {
    res.json(err);
  }
});

//Get all items from to do list
router.get("/api/items", async (req, res) => {
  try {
    const toDoList = await todoItemsModel.find({});
    res.status(200).json(toDoList);
  } catch (err) {
    console.log(err);
  }
});

// Update item from to do list
router.put("/api/item/:id", async (req, res) => {
  try {
    //req.body = {item:go swimming}
    const newToDoItem = req.body;
    const editedToDoItem = req.params.id;
    const updateToDoItem = await todoItemsModel.findByIdAndUpdate(
      editedToDoItem,
      //$set replaces value of a existing field with the given value
      // Below same as: {$set: {'item' : 'go swimming'}}
      { $set: newToDoItem }
    );
    res.status(200).json({ updateToDoItem });
    console.log("Updated Successfully");
  } catch (err) {
    console.log(err);
  }
});

//Delete item from to do list
router.delete("/api/item/:id", async (req, res) => {
  try {
    const deletedToDoItem = req.params.id;

    const deletedItem = await todoItemsModel.findByIdAndDelete(deletedToDoItem);

    res.status(200).json(deletedItem);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
