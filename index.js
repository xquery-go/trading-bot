import express from "express";
const app = express();

const PORT = process.env.PORT || 5000;

// start the server

app.listen(PORT, () => {
  console.log("Server started" + "http://localhost:" + PORT);
});
