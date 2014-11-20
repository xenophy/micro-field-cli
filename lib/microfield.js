var microfield = exports;


console.log("test");

var request = require('request');
url = 'http://cdn.sencha.com/ext/gpl/5.0.1/packages/sencha-core/src/Ext.js';

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error: '+ response.statusCode);
  }
})
