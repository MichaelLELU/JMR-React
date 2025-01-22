const express = require("express");
const multer = require("multer");

const cors = require("cors");

const app = express();

// Autoriser les requêtes Cross-Origin
app.use(cors());

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Dossier de stockage
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = `/files/uploads/${req.file.filename}`;
  res.status(201).json({ filePath });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Upload service running on port ${PORT}`));
