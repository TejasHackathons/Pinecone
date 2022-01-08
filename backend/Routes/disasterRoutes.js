const express = require("express");
const router = express.Router();
const supabase = require("../Connections/supabaseConn");

const disasterValidator = require("../Validators/validDisaster");
const latLongValidator = require("../Validators/validLatLong");

router.post("/createDisaster", async (req, res) => {
  if (!req.session.userID)
    return res.status(401).send("Must be logged in to report disaster. ");

  const { disaster, currentLat, currentLong } = req.body;
  console.log(disaster);
  if (!disasterValidator(disaster))
    return res.status(400).send("Invalid disaster type. ");
  if (!latLongValidator(currentLat, currentLong))
    return res.status(400).send("Invalid latitude-longitude. ");
  const { data, error } = await supabase.from("disasters").insert({
    userID: req.session.userID,
    disasterType: disaster,
    disasterLat: parseInt(currentLat),
    disasterLong: parseInt(currentLong),
  });
  if (error) return res.status(500).send("Internal server error. ");
  return res.status(201).send("Successfully reported disaster. ");
});

module.exports = router;
