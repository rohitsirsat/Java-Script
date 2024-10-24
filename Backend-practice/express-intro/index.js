import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add tea
app.post("/teas", (req, res) => {
  // actual data come like req.body.name and req.body.price but here, we are disturing it on the go
  const { name, price } = req.body;

  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);

  res.status(201).send(newTea);
});
///
// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get single tea by id
app.get("/teas/:id", (req, res) => {
  // anythig that comes in the url is a string that's why we use parseInt to convert it to a number
  const singleTea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!singleTea) {
    return res.status(404).send("tea not found");
  } else {
    return res.status(200).send(singleTea);
  }
});

// update tea
app.put("/teas/:id", (req, res) => {
  const teaId = req.params.id;
  const { name, price } = req.body;

  const exsistingTea = teaData.find((tea) => tea.id === parseInt(teaId));
  if (!exsistingTea) {
    return res.status(404).send("Tea does not exist");
  } else {
    exsistingTea.name = name;
    exsistingTea.price = price;
    return res.status(200).send(exsistingTea);
  }
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const teaId = req.params.id;
  const exsistingTea = teaData.find((tea) => tea.id === parseInt(teaId));
  if (!exsistingTea) {
    return res.status(404).send("Tea does not exist");
  } else {
    const index = teaData.indexOf(exsistingTea);
    teaData.splice(index, 1);
    return res.status(200).send(exsistingTea);
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running at post: ${port}....`);
});
