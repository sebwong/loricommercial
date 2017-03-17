var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var os = require("os");

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname , 'public')));

// views is directory for all template files
app.set('views', path.join(__dirname , 'views'));
app.set('public', path.join(__dirname , 'public'));
app.set('view engine', 'ejs');



function getBlogsInfo(){
	blogList=[];
	file = path.join('views', 'pages', 'blog_list');
	fileInfo = fs.readFileSync(file).toString().split(os.EOL);
	var blogInfo = {};
	var counter = 0;
	for (var line of fileInfo) {
		if (line == '-') {
			blogList.push(blogInfo);
			counter++;
			if (counter == 5) {
				break;
			}
			blogInfo = {};
		}
		else {
			lineSplit = line.split(':');
			blogInfo[lineSplit[0].trim()] = lineSplit[1].trim();
		}
	}
	return blogList
}

function getFeaturedInfo(){
	featuredList=[];
	file = path.join('views', 'pages', 'featured');
	fileInfo = fs.readFileSync(file).toString().split(os.EOL);
	var featuredInfo = {};
	fileInfo.forEach(line => {
		if (line == '-') {
			featuredList.push(featuredInfo);
			featuredInfo = {};
		}
		else {
			lineSplit = line.split(':');
			featuredInfo[lineSplit[0].trim()] = lineSplit[1].trim();
		}
	})
	return featuredList;
}


app.get('/', function(request, response) {
  response.render(path.join('pages', 'index'), {});;
});

app.get('/:type', function(request, response) {
    reqType = request.params.type;
    if (!reqType.startsWith('favicon')){
	    if (reqType == 'blog') {
	    	response.render(path.join('pages', reqType), {
	    		blogList: getBlogsInfo(),
					featuredList: getFeaturedInfo()
	    	});
			} else {
	    	response.render(path.join('pages', reqType), {});
			}
	}
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
