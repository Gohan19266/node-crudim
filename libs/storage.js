const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/imgs')
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
      cb(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`);
      cb(null,uuid()+path.extname(file.originalname));
    }
  })

  var upload = multer({ storage })

  module.exports = upload;