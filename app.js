var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname , 'public')));

// views is directory for all template files
app.set('views', path.join(__dirname , 'views'));
app.set('public', path.join(__dirname , 'public'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.redirect('/index');
});

app.get('/:type', function(request, response) {
    reqType = request.params.type
    response.render(path.join('pages', reqType), {});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});