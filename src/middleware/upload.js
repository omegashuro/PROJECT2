const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-OmegaShuro-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;

// // Get one image by its ID
// app.get('/images/:id', (req, res, next) => {
//   let imgId = req.params.id;

//   Image.findById(imgId, (err, image) => {
//       if (err) {
//           res.sendStatus(400);
//       }
//       // stream the image back by loading the file
//       res.setHeader('Content-Type', 'image/jpeg');
//       fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
//   })
// });

// // Delete one image by its ID
// app.delete('/images/:id', (req, res, next) => {
//   let imgId = req.params.id;

//   Image.findByIdAndRemove(imgId, (err, image) => {
//       if (err && image) {
//           res.sendStatus(400);
//       }

//       del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
//           res.sendStatus(200);
//       })
//   })
// });