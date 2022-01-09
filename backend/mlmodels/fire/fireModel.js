const tf = require("@tensorflow/tfjs-node");
const predictFireMagnitude = async (month, latitude, longitude) => {
  const fireModel = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/TejasHackathons/Pinecone/main/backend/mlmodels/fire/fireModel.json"
  );
  const prediction = fireModel
    .predict(tf.tensor([[latitude, longitude, month]]))
    .arraySync()[0][0];
  return Math.abs(prediction);
};

predictFireMagnitude(1, 1, 1).then((prediction) => console.log(prediction));
module.exports = predictFireMagnitude;
