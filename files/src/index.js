import path from "node:path";
import cors from "cors";
import express from "express";
import multer from "multer";

const app = express();

app.use(cors());
app.use("/files", express.static(path.join(__dirname, "../public")));

const port = 4000;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/");
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "fichier bien Upload", file: req.file });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
