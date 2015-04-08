var net = require('net');
var server = net.createServer();
var workInfo = require('./dbs/schemas/work_info');

server.on('connection', function(socket){

	var dat = '';
	
	console.log(new Date() + ":" + socket.remoteAddress + ":" + socket.remotePort);

	socket.on('data', function(chunk){

		dat += chunk.toString();
	});

	socket.on('end', function(){
		
		var infos;
		var len = 0;
	
		if (dat)
		{
			infos = dat.split('}');
			len = infos.length - 1;
	
			for (var i = 0; i < len; ++i)
			{
				var info = JSON.parse(infos[i] + '}');
			
				console.log(info);
				
				switch (info.type)
				{
					case 0:	//-- base work information --//
						workInfo.insertOrUpdateWorkInfo(info);
						break;
					default:
						break;
				}
			}
		}
	});

}); 
	
module.exports.startSocketServer = function startSocketServer(){

	server.listen(8000);
};


