const validDisaster = (disaster) => {
  disaster = disaster.toLowerCase();
  return disaster == "fire" || disaster == "hurricane" || disaster == "tornado";
};

module.exports = validDisaster;
