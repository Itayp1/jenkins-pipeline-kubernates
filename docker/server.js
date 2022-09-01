const express = require("express");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const fs = require("fs");
const path = require("path");
// const util = require('util');
const { exec } = require("child_process");

// const exec = util.promisify(child.exec);
// const result = await exec(`my command`);
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
  console.log("getCounter request");
  const file = JSON.parse(fs.readFileSync(fileLocation, "utf8"));
  return res.status(200).json(file);
});
app.put("/addCounter", (req, res) => {
  console.log("addCounter request");
  const file = JSON.parse(fs.readFileSync(fileLocation, "utf8"));
  file.counter = file.counter + 1;
  fs.writeFileSync(fileLocation, JSON.stringify(file), "utf8");

  return res.status(200).json(file);
});
app.post("/writeFile", (req, res) => {
  console.log("writeFile request");
  fs.writeFileSync(fileLocation, JSON.stringify({ counter: 0 }), "utf8");

  return res.status(200).json();
});

app.post("/makeLoad/:load", (req, res) => {
  const laod = req.params.load;
  console.log("makeLoad request" + laod);

  // return res.status(200).json({ user: usage.user, system: usage.system });
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(() => {
    exec("node load.js " + laod, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      } else {
      }
    });
  });
  var usage = process.cpuUsage();
  res.status(200).json(usage);
});
app.listen(PORT, () => {
  console.log("listen on port 3000!");
});
