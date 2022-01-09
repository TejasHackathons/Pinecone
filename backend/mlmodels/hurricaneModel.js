const brainJS = require("brain.js");
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const net = new brainJS.NeuralNetwork({
  activation: "relu",
  hiddenLayers: [100],
  leakyReluAlpha: 0.9,
});
const trainingData = [];
fs.createReadStream(path.resolve(__dirname, "../data/hurricanes.csv"))
  .pipe(csv.parse({ headers: false }))
  .on("error", (err) => console.log(err))
  .on("data", (row) => {
    trainingData.push({
      input: row.slice(1, 4).map((el) => parseInt(el)),
      output: [parseInt(row[4])],
    });
  })
  .on("end", () => {
    console.log(trainingData);
    net.train(trainingData.splice(0, 100), { log: true });

    const output = net.run([6, 50, -100]);
    console.log(output);
  });
