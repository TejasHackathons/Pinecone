const brainJS = require("brain.js");
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const net = new brainJS.NeuralNetwork({
  activation: "leaky-relu",
  hiddenLayers: [500],
});
const trainingData = [];
fs.createReadStream(path.resolve(__dirname, "../data/tornados.csv"))
  .pipe(csv.parse({ headers: false }))
  .on("error", (err) => console.log(err))
  .on("data", (row) => {
    trainingData.push({
      input: row.slice(1, 4).map((el) => parseInt(el)),
      output: [1],
    });
  })
  .on("end", () => {
    console.log(trainingData);
    net.train(trainingData.splice(0, 1000), { log: true });
    const output = net.run([9, 27.75, -98.02]);
    console.log(output);
  });
