var mongoose = require('../config.js');
var Schema = mongoose.Schema;

var schema = new Schema({

	midAddress	:	String,
	address		:	String,
	data		:	[Schema.Types.Mixed],
	upDatedAt	:	String
});

var workInfo = mongoose.model('work_infos', schema, 'work_infos');

/**
 * insert or update a work information.
 *
 *@param 	{json} 	info.
 *@return	none.
 */
module.exports.insertOrUpdateWorkInfo = function insertOrUpdateWorkInfo(info){
	
	workInfo.findOne({midAddress:info.midAddress, address:info.address}, function(err, doc){
		
		if (err)
		{
			console.log("insert or update work informations failed!");
		}
		else
		{
			if (doc)
			{
				info.data[0] += doc.data[0];
			}
			
			workInfo.update({midAddress:info.midAddress, address:info.address}, 
			{midAddress:info.midAddress, address:info.address, data:info.data, upDatedAt: new Date()},
			{upsert:true},
			function(err, result){
		
				if (err)
				{
					console.log("insert or update work informations failed!");
				}
				else
				{
					console.log("insert or update work informations successful!");
				}
			});
		}

	});
};

/**
 * find a work information.
 *
 *@param 	{json} 	info.
 *@return	none.
 */
module.exports.getWorkInfos = function getWorkInfos(req, res, next){

	workInfo.find(function(err, docs){
	
		var vaild_infos = '';
		
		if (err)
		{
			console.log("no work informations");
			
			res.send(201);
			
			next();
		}
		else
		{
			var json = 
			{
				address:"",
				workSpeed:0,
				totalRotates:0
			};
			var len = docs.length - 1;
			
			vaild_infos += '[';
			
			for (var i = 0; i < len; ++i)
			{
				json.address = docs[i].address;
				json.workSpeed = docs[i].data[1];
				json.totalRotates = docs[i].data[0];
				
				vaild_infos += JSON.stringify(json) + ',';				
			}
			
			json.address = docs[i].address;
			json.workSpeed = docs[i].data[1];
			json.totalRotates = docs[i].data[0];
			
			vaild_infos += JSON.stringify(json) + ']';	
			
			res.setHeader('Content-Type', 'text/html');
			res.send(vaild_infos);
			next();			
		}
		

	});
};
