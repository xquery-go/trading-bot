import express from "express";
const app = express();

const PORT = process.env.PORT || 5000;

// start the server

app.listen(PORT, () => {
  console.log("Server started" + "http://localhost:" + PORT);
});

// define routes

import appRoutes from "./routes/app.routes.js";
import ErrorMiddleware from "./middlewares/error.middleware.js";
import startMonitering from "./bot.js";
// define versioning routes
app.use("/app/v1", appRoutes);

startMonitering();
// error middleware
app.use(ErrorMiddleware)