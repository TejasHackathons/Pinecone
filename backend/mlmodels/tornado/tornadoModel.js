const tf = require("@tensorflow/tfjs-node");
const predictTornadoMagnitude = async (month, latitude, longitude) => {
  const tornadoModel = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/TejasHackathons/Pinecone/main/backend/mlmodels/tornadoModel.json"
  );
  const prediction = tornadoModel
    .predict(tf.tensor([[month, latitude, longitude]]))
    .arraySync()[0][0];
  return prediction;
};

module.exports = predictTornadoMagnitude;
