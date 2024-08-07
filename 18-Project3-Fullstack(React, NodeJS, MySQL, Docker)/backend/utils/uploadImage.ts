import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.fileName}`);
  }
});

export const upload = multer({ storage: storage });
