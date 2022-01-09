const tf = require("@tensorflow/tfjs-node");
const predictTornadoMagnitude = async (month, latitude, longitude) => {
  const hurricaneModel = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/TejasHackathons/Pinecone/main/backend/mlmodels/tornado/tornadoModel.json"
  );
  const prediction = hurricaneModel
    .predict(tf.tensor([[month, latitude, longitude]]))
    .arraySync()[0][0];
  return prediction;
};

predictTornadoMagnitude(1, 1, 1).then((mag) => console.log(mag));
module.exports = predictTornadoMagnitude;
