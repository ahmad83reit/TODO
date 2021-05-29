const multer = require("multer");
const fs = require('fs');
const csvFilter = (req, file, cb) => {
  console.log(req);
  console.log(file);
  if (file.mimetype.includes("excel") ||file.mimetype.includes("csv") ) {
    try {
      cb(null, true);
    }
    catch (err) { cconsole.log(err); }
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {    
    var dir = __basedir + "/csv_uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, __basedir + "/csv_uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-mhd-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;
