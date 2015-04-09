var restify = require('restify');
var workInfo = require('./dbs/schemas/work_info');

var server = restify.createServer({
	
	name:"innotek rice seedling server",
	version:"0.0.1"
});

var visitCounter = 0;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(function (req, res, next){

	console.log(req.method + " http://" + req.headers.host + req.url + " " + visitCounter++);
	next();
});

server.get({path:'work_infos'}, function(req, res, next){

	workInfo.getWorkInfos(req, res, next);
});
	
module.exports.startHttpServer = function startHttpServer(){

	server.listen(8001, function(){
	
		console.log(server.name + " " + server.url);
	});	
};






