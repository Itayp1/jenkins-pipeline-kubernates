const fs = require("fs");
const axios = require("axios");

const list = fs.readdirSync(".").filter((name) => name.endsWith(".yaml"));
const files = [];

for (let index = 0; index < list.length; index++) {
  const fileName = list[index];
  const obj = {
    fileName,
    fileContent: fs.readFileSync(`./${fileName}`, "base64"),
  };
  files.push(obj);
}

const start = async () => {
  try {
    await axios.post("http://localhost:3000/deployFiles", files).then().catch();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
start();
