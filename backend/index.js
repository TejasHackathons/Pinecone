const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const expressSessions = require("express-session");
require("dotenv").config();
const cors = require("cors");

const redis = require("ioredis");
const redisConn = require("connect-redis")(expressSessions);

const accountRoutes = require("./Routes/accountRoutes");
const disasterRoutes = require("./Routes/disasterRoutes");

const redisClient = redis.createClient({
  host: process.env.redisHostname,
  port: parseInt(process.env.redisPort),
  password: process.env.redisPassword,
});

const app = express();
app.use(
  expressSessions({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: "userID",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: new redisConn({
      client: redisClient,
    }),
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/account", accountRoutes);
app.use("/disasters", disasterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
