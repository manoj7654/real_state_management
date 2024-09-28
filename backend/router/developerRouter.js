const express=require("express");
const {  createDeveloper,
    getAllDevelopers,
    updateDeveloper,
    deleteDeveloper, } = require("../controller/developerController");

const developerRouter=express.Router();

// for creating developer
developerRouter.post("/developers",createDeveloper)

// for getting all developer
developerRouter.get("/developers",getAllDevelopers)

// for updating developer by id
developerRouter.put("/developers/:id",updateDeveloper)

// for deleting developer by id
developerRouter.delete("/developers/:id",deleteDeveloper)
module.exports=developerRouter