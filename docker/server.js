const express = require("express");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const fs = require("fs");
const path = require("path");
const app = express();
const ENV = process.env.ENV || "deafult";
const PORT = process.env.PORT || 3000;
const KUBE_ENV_TEST = process.env.KUBE_ENV_TEST || "";
const MOUNT_PATH = process.env.MOUNT_PATH || "";
const USERNAME = process.env.USERNAME || "";
const PASSWORD = process.env.PASSWORD || "";
const SERVICE_NAME = process.env.SERVICE_NAME || "";

const fileLocation = path.join(MOUNT_PATH, "tmp.json");

app.get("/health", (req, res) => {
  console.log(" health request");
  return res.status(200).json({ status: "UP", SERVICE_NAME, ENV, KUBE_ENV_TEST, USERNAME, PASSWORD });
});

app.get("/getCounter", (req, res) => {
  console.log("got request");
  const file = JSON.parse(fs.readFileSync(fileLocation, "utf8"));
  return res.status(200).json(file);
});
app.put("/addCounter", (req, res) => {
  console.log("got request");
  const file = JSON.parse(fs.readFileSync(fileLocation, "utf8"));
  file.counter = file.counter + 1;
  fs.writeFileSync(fileLocation, JSON.stringify(file), "utf8");

  return res.status(200).json(file);
});
app.post("/writeFile", (req, res) => {
  console.log("got request");
  fs.writeFileSync(fileLocation, JSON.stringify({ counter: 0 }), "utf8");

  return res.status(200).json();
});

app.listen(PORT, () => {
  console.log("listen on port 3000!");
});
