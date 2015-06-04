var express=require('express');
var path = require('path');
var uuid = require('node-uuid');
var mv = require('mv');

const PUBLIC_PATH = '../../public_static/';
const PORT = 3001;

function upload(req, res) {
  var oldFilePath = req.headers['x-file'];
  var filename = uuid.v1() + '.zip';
  var newFilePath = path.resolve(__dirname, PUBLIC_PATH, filename);
  mv(oldFilePath, newFilePath, function(err) {
    if (err) {
      console.log('move failed', err);
      res.status(500).send('upload failed');
      return;
    }
    console.log('upload complete', filename);
    res.end('upload complete');
  });
}

var app = express();
app.post('/upload', upload);

app.listen(PORT, function() {
  console.log('listening on ' + PORT);
});
