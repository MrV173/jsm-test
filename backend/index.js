import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import route from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(route);

app.listen(5000, () => console.log("Server running at port 5000..."));
