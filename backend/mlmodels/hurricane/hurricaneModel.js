const tf = require("@tensorflow/tfjs-node");
const predictHurricaneMaxWind = async (month, latitude, longitude) => {
  const hurricaneModel = await tf.loadLayersModel(
    "https://raw.githubusercontent.com/TejasHackathons/Pinecone/main/backend/mlmodels/hurricane/hurricaneModel.json"
  );
  const prediction = hurricaneModel
    .predict(tf.tensor([[month, latitude, longitude]]))
    .arraySync()[0][0];
  return prediction;
};

predictHurricaneMaxWind(1, 1, 1).then((wind) => console.log(wind));
// module.exports = predictHurricaneMaxWind;
