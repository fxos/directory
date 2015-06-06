var express=require('express');
var path = require('path');
var fs = require('fs');
var ff = require('ff');
var uuid = require('node-uuid');
var mv = require('mv');

const PUBLIC_PATH = '../../public_static/';
const PORT = 3001;

function upload(req, res) {
  var name = req.query.name;
  var description = req.query.description;
  var metaContent = name + '\n' + description;

  console.log('got one!', name, description);

  var oldPath = req.headers['x-file'];
  var newPath = path.resolve(__dirname, PUBLIC_PATH);

  var prefix = name.replace(' ', '_') + '__' + uuid.v1();
  var packageFilename = prefix + '.zip';
  var metaFilename = prefix + '.txt';

  var f = ff(function() {
    mv(oldPath, path.join(newPath, packageFilename), f());
    fs.writeFile(path.join(newPath, metaFilename), metaContent, f());
  }, function(mvErr, writeErr) {
    if (mvErr) {
      console.log('move failed', mvErr);
      res.status(500).send('upload failed');
      return;
    }
    if (writeErr) {
      console.log('move failed', writeErr);
      res.status(500).send('upload failed');
      return;
    }
    console.log('upload complete', prefix);
    res.end('upload complete');
  });
}

var app = express();
app.post('/upload', upload);

app.listen(PORT, function() {
  console.log('listening on ' + PORT);
});
