const path = require("path");
const multer = require("multer");
const createError = require("http-errors");

function fileUpload(
  subFolderPath,
  allowedFileTypeArray,
  limitSize,
  errorMessage
) {
  const uploadFolder = `${__dirname}/../public/uploads/${subFolderPath}/`;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname.replace(fileExt).toLowerCase().split(" ").join("-") +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: limitSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFileTypeArray.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errorMessage));
      }
    },
  });

  return upload;
}

module.exports = fileUpload;
