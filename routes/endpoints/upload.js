const multer = require('multer');
const path = require('path');
const app = require('../routes_index');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', upload.single(Image), (req, res) => {
  res.send('Image Upload');
});

const upload = multer({ storage: storage });
