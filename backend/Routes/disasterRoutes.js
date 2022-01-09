const express = require("express");
const router = express.Router();
const supabase = require("../Connections/supabaseConn");

const disasterValidator = require("../Validators/validDisaster");
const latLongValidator = require("../Validators/validLatLong");

const fireModel = require("../mlmodels/fire/fireModel");
const hurricaneModel = require("../mlmodels/hurricane/hurricaneModel");
const tornadoModel = require("../mlmodels/tornado/tornadoModel");
router.post("/createDisaster", async (req, res) => {
  if (!req.session.userID)
    return res.status(401).send("Must be logged in to report disaster. ");
  let { disaster, currentLat, currentLong } = req.body;
  disaster = disaster.toLowerCase();
  currentLat = parseFloat(currentLat);
  currentLong = parseFloat(currentLong);
  if (!disasterValidator(disaster))
    return res.status(400).send("Invalid disaster type. ");
  if (!latLongValidator(currentLat, currentLong))
    return res.status(400).send("Invalid latitude-longitude. ");
  const month = parseInt(new Date().getMonth());
  if (disaster == "fire") {
    fireModel(currentLat, currentLong, month).then(async (prediction) => {
      const { data, error } = await supabase.from("disasters").insert({
        userID: req.session.userID,
        disasterType: disaster,
        disasterLat: parseInt(currentLat),
        disasterLong: parseInt(currentLong),
        prediction,
      });
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error. ");
      }
    });
  } else if (disaster == "hurricane") {
    hurricaneModel(month, currentLat, currentLong).then(async (prediction) => {
      const { data, error } = await supabase.from("disasters").insert({
        userID: req.session.userID,
        disasterType: disaster,
        disasterLat: parseInt(currentLat),
        disasterLong: parseInt(currentLong),
        prediction,
      });
      if (error) {
        console.log(error);
        return res.status(500).send("Internal server error. ");
      }
    });
  } else if (disaster == "tornado") {
    const prediction = await tornadoModel(month, currentLat, currentLong);
    const { data, error } = await supabase.from("disasters").insert({
      userID: req.session.userID,
      disasterType: disaster,
      disasterLat: parseInt(currentLat),
      disasterLong: parseInt(currentLong),
      prediction,
    });
    if (error) {
      console.log(error);
      return res.status(500).send("Internal server error. ");
    }
  }
  return res.status(201).send("Successfully reported disaster. ");
});

router.get("/disasterList", async (req, res) => {
  const userID = req.session.userID;
  if (!userID)
    return res.status(401).send("Must be logged in to view disasters. ");
  const { data, error } = await supabase.from("disasters").select();
  if (error) return res.status(500).send("Internal server error. ");
  return res.json({ msg: data });
});

router.post("/disasterInfo", async (req, res) => {
  const { disasterID } = req.body;
  const { data, error } = await supabase
    .from("disasters")
    .select()
    .eq("id", disasterID);
  if (error) return res.status(500).send("Internal server error. ");
});
module.exports = router;
