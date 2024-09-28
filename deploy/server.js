const express = require("express");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/deployFiles", async (req, res) => {
  const directoryPath = __dirname;

  try {
    // Remove all files that start with '.yaml'
    const filesInDirectory = fs.readdirSync(directoryPath);
    for (let i = 0; i < filesInDirectory.length; i++) {
      const file = filesInDirectory[i];
      if (file.startsWith(".yaml")) {
        const filePath = path.join(directoryPath, file);
        fs.unlinkSync(filePath); // Remove the file
        console.log(`Removed file: ${filePath}`);
      }
    }

    const files = req.body;

    if (!Array.isArray(files)) {
      return res.status(400).send("Invalid input, expected an array of objects");
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { fileName, fileContent } = file;

      if (!fileName || !fileContent) {
        return res.status(400).send("Invalid input, each object must have fileName and fileContent");
      }

      const filePath = path.join(directoryPath, fileName);

      // Decode base64 content and write it to a file
      const buffer = Buffer.from(fileContent, "base64");
      fs.writeFileSync(filePath, buffer);
    }

    // Execute a command synchronously
    const commandOutput1 = await execSync("kubectl  apply -f qa-config-map.yaml", { encoding: "utf-8" });
    const commandOutput2 = await execSync("kubectl  apply -f Deployment.yaml", { encoding: "utf-8" });
    const commandOutput3 = await execSync("kubectl  apply -f HorizontalPodAutoscaler.yaml", { encoding: "utf-8" });
    const commandOutput4 = await execSync("kubectl  apply -f Service.yaml", { encoding: "utf-8" });
    const commandOutput5 = await execSync("kubectl  apply -f Ingress.yaml", { encoding: "utf-8" });
    console.log(`Command output: ${commandOutput1}`);
    console.log(`Command output: ${commandOutput2}`);
    console.log(`Command output: ${commandOutput3}`);
    console.log(`Command output: ${commandOutput4}`);
    console.log(`Command output: ${commandOutput5}`);

    res.status(200).send("Files saved successfully and command executed");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
