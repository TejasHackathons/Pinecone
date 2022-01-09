const tf = require("@tensorflow/tfjs-node");
const predictTornadoMagnitude = async (month, latitude, longitude) => {
  const hurricaneModel = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/TejasHackathons/Pinecone/main/backend/mlmodels/hurricane/hurricaneModel.json"
  );
  const prediction = hurricaneModel
    .predict(tf.tensor([[month, latitude, longitude]]))
    .arraySync()[0][0];
  return prediction;
};

predictTornadoMagnitude(10, 20, 15).then((mag) => console.log(mag));
module.exports = predictTornadoMagnitude;
