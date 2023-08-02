const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Your bot is alive!");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
