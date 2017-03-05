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



function get_blogs_info(){
	blogs_list=[]
	file = path.join('views', 'pages', 'blog_list');
	file_info = fs.readFileSync(file).toString().split('\n')
	var blog_info = {}
	file_info.forEach(line => {
		if (line == '-') {
			blogs_list.push(blog_info)
			blog_info = {}
		}
		else {
			line_split = line.split(':')
			blog_info[line_split[0].trim()] = line_split[1].trim()
		}
	})
	return blogs_list
}

app.get('/', function(request, response) {
  response.redirect('/index');
});

app.get('/:type', function(request, response) {
    reqType = request.params.type
    if (!reqType.startsWith('favicon')){
	    if (reqType == 'blog') {
	    	response.render(path.join('pages', reqType), {
	    		blogs_list: get_blogs_info()
	    	});
	    }
	    else {
	    	response.render(path.join('pages', reqType), {});
		}
	}
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});