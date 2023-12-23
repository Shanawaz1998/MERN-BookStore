import express from "express"; //To use this type of import we need to add "type": "module" in the package.json file
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(cors());
app.use(express.json());
app.use(bookRouter);

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.listen(PORT, () => {
  console.log("The server is listening on ", PORT);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
