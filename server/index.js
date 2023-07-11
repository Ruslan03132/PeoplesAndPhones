
require("dotenv").config();
const models = require("./models/model");
const express = require("express");
const sequelize = require("./db");
const router = require("./routes/index");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
async function start() {
  
    try {
        await sequelize.authenticate();
        await sequelize.sync(); 
        app.listen(PORT, () => {
            console.log("serverStarted, PORT: " + PORT);
        });
    } catch (e){
        console.log(e);
    }
}
start();  


