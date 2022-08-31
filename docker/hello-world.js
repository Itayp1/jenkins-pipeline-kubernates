const express = require("express");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const app = express();
const ENV = process.env.ENV || "deafult";
const PORT = process.env.PORT || 3000;
const KUBE_ENV_TEST = process.env.KUBE_ENV_TEST || "";

app.get("/health", (req, res) => {
  console.log(" health request");
  return res.status(200).json({ status: "UP", KUBE_ENV_TEST, ENV });

  // process.exit(0);
});

app.get("/check", (req, res) => {
  console.log("got request");
  res.status(400).json(`hello-world-kubernates2 in ${ENV}!!`);

  // process.exit(0);
  return;
});

app.listen(PORT, () => {
  console.log("listen on port 3000!");
});
