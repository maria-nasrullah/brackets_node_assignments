const multer = require("multer");

//setting storage option
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.mimetype.split("/")[1];
    const fileName = `${file.fieldname}-${suffix}.${extension}`;
    req.fileName = fileName;
    cb(null, fileName);
  },
});

//upload file
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg formats are allowed!"));
    }
  },
});

module.exports = upload;
