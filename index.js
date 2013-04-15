var express = require('express');
var app = express();

app.get(/^(.+)$/, function(req, res) 
{ 
console.log(req.params[0] + ' requested');
res.sendfile('client/' + req.params[0]); 

});

console.log('Listening on port 3000');

app.listen(3000)