const express = require("express");
const supabase = require("../Connections/supabaseConn");
const bcrypt = require("bcrypt");
const router = express.Router();

const latLongValidator = require("../Validators/validLatLong");
const phoneNumberValidator = require("../Validators/validPhoneNumber");
const passwordValidator = require("../Validators/validPassword");

router.post("/signup", (req, res) => {
  const { phoneNumber, password, homeLat, homeLong } = req.body;

  if (!phoneNumberValidator(phoneNumber))
    return res.status(400).send("Invalid phone number. ");
  if (!passwordValidator.validate(password))
    return res
      .status(400)
      .send(
        "Invalid password. Password has at least 6 characters and at most 20, 3 digits, and 1 symbol. "
      );
  if (!latLongValidator(homeLat, homeLong))
    return res.status(400).send("Invalid latitude-longitude. ");
  bcrypt.hash(
    password,
    parseInt(process.env.bcryptSaltRounds),
    async (err, hash) => {
      if (err) return res.status(500).send("Internal server error. ");
      const { data, error } = await supabase.from("users").insert([
        {
          phoneNumber,
          password: hash,
          homeLat: parseInt(homeLat),
          homeLong: parseInt(homeLong),
        },
      ]);
      if (error)
        return error.message ==
          'duplicate key value violates unique constraint "users_phoneNumber_key"'
          ? res.status(400).send("Phone number already exists. ")
          : res.status(500).send("Internal server error. ");
      return res.status(201).send("Successfully signed up! ");
    }
  );
});

router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  const { data, error } = await supabase
    .from("users")
    .select("id, password")
    .eq("phoneNumber", phoneNumber);
  if (error) return res.status(500).send("Internal server error. ");
  if (data.length == 0)
    return res.status(400).send("No user found with given phone number. ");
  bcrypt.compare(password, data[0].password, (err, result) => {
    if (err) return res.status(500).send("Internal server error. ");
    if (!result) return res.status(400).send("Incorrect password. ");
    req.session.userID = data[0].id;
    return res.status(200).send("Successfully authenticated! ");
  });
});

router.get("/userID", (req, res) => {
  return req.session.userID
    ? res.json({ msg: req.session.userID })
    : res.status(401).send("Not logged in. ");
});

router.get("/isLoggedIn", (req, res) => {
  return res.json({ msg: req.session.userID ? true : false });
});

router.post("/logout", (req, res) => {
  req.session.userID
    ? req.session.destroy((err) => {
        if (err) return res.status(500).send("Internal server error. ");
        res.clearCookie(process.env.cookieName);
        return res.status(200).send("Successfully logged out. ");
      })
    : res.status(400).send("Not logged in. ");
});

module.exports = router;
