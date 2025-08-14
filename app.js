import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./models/db.js";
import { model_list } from "./models/model_list.js"
import AuthRoutes from "./routes/Auth/routes.js";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./utils/.env" });
sequelize.sync({ alter: false, force: false });

const app = express(); 

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome to money mentor");
});

app.use("/api/auth", AuthRoutes)

app.use((req, res) => {
    res.status(404).send("hi");
}); 


app.listen(process.env.PORT);