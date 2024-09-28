const express=require("express");
const app=express();
const cors=require("cors")

require("dotenv").config()

const developerRouter = require("./router/developerRouter");
const projectRouter = require("./router/projectRouter");
const towerRouter = require("./router/towerRouter");
const seriesRouter = require("./router/seriesRouter");

app.use(cors())
app.use(express.json());


app.use("/api",developerRouter)
app.use("/api",projectRouter)
app.use("/api",towerRouter)
app.use("/api",seriesRouter)

app.listen(process.env.port,()=>{
    console.log(`Server is running on port no ${process.env.port}`)
})


