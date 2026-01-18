const multer = require('multer');
const fs = require("fs")
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null,`${new Date().getTime()}` + '.' + `${file.originalname?.split('.')[1]}`);
    }
});
 const upload = multer({ storage: storage ,
    limits : {fieldSize: 1024 * 1024 * 5}, });

 module.exports = upload
