const validLatLong = (lat, long) => {
  return (
    -90 <= parseInt(lat) &&
    parseInt(lat) <= 90 &&
    -180 <= parseInt(long) &&
    parseInt(long) <= 180
  );
};

module.exports = validLatLong;
