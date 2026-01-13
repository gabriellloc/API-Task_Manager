// Imports
import express from "express";

// Errors
import { errorHandling } from "./middlewares/errorHandling";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);

app.use(errorHandling);
export { app };
