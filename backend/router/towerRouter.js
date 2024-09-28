const express = require("express");
const {
    createTower,
    getAllTowers,
    getTowerById,
    updateTower,
    deleteTower,
} = require("../controller/towerController");

const towerRouter = express.Router();

// Create a new tower
towerRouter.post("/towers", createTower);

// Get all towers
towerRouter.get("/towers", getAllTowers);

towerRouter.get("/towers/:id",getTowerById)
// Update tower by ID
towerRouter.put("/towers/:id", updateTower);

// Delete tower by ID
towerRouter.delete("/towers/:id", deleteTower);

module.exports = towerRouter;
