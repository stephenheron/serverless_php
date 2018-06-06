'use strict';

var child_process = require('child_process');

module.exports.handle = (event, context, callback) => {

  var response = '';
  var php = './php';

  // When using 'serverless invoke local' use the system PHP binary instead
  if (typeof process.env.PWD !== "undefined") {
    php = 'php';
  }

  // Launch PHP
  var args = ['test.php'];
  var options = {'stdio': ['pipe', 'pipe', 'pipe', 'pipe']};
  var proc = child_process.spawn(php, args, options);

  // Output
  proc.stdout.on('data', function (data) {
    response += data.toString()
  });

  // PHP script execution end
  proc.on('close', function(code) {
    if (code !== 0) {
      return callback(new Error(`Process error code ${code}: ${response}`));
    }

    callback(null, {"userId": response});
  });

};
