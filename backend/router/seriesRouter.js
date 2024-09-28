const express = require("express");
const {
    createSeries, getSeriesById, getAllSeries, updateSeries, deleteSeries} = require("../controller/seriesController");

const seriesRouter = express.Router();

// Create a new series
seriesRouter.post("/series", createSeries);

// Get all series
seriesRouter.get("/series", getAllSeries);

seriesRouter.get("/series/:id",getSeriesById)

// Update series by ID
seriesRouter.put("/series/:id", updateSeries);

// Delete series by ID
seriesRouter.delete("/series/:id", deleteSeries);

module.exports = seriesRouter;
