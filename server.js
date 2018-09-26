'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  var upfile = req.file;
  if (!upfile) {
    return res.json({ error: 'File is missing' });
  }

  var fileName = upfile.originalname;
  var mimeType = upfile.mimetype;
  var fileSize = upfile.size;
  res.json({
    name: fileName,
    type: mimeType,
    size: fileSize,
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
