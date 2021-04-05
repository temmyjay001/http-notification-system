const express = require("express");
const port = 9000;

const app = express().use(express.json({ urlencoded: true }));

app.post("/test1", (req, res) => {
  console.log(req.body);
  res.status(200).json('Acknowledged');
});

app.post("/test2", (req, res) => {
    console.log(req.body);
    res.status(200).json('Acknowledged');
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log("Subscriber 1 service started:::");
});

