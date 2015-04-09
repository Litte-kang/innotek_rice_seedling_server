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

	workInfo.findOneAndUpdate({midAddress:info.midAddress, address:info.address},
	{midAddress:info.midAddress, address:info.address, data:info.data, upDatedAt: new Date()}, {upsert:true},
	function(err, result){

		if (err)
		{
			console.log("save work information failed!");
		}
		else
		{
			console.log("save work information sucessful!");
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

	workInfo.find({midAddress:'0000000000'}, function(err, infos){
	
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
				riceSeedlingSum:0,
				earthSize:0
			};
			var len = infos.length - 1;
			
			vaild_infos += '[';
			
			for (var i = 0; i < len; ++i)
			{
				json.address = infos[i].address;
				json.riceSeedlingSum = infos[i].data[0];
				json.earthSize = infos[i].data[1];
				
				vaild_infos += JSON.stringify(json) + ',';				
			}
			
			json.address = infos[i].address;
			json.riceSeedlingSum = infos[i].data[0];
			json.earthSize = infos[i].data[1];
			
			vaild_infos += JSON.stringify(json) + ']';	
			
			res.setHeader('Content-Type', 'text/html');
			res.send(vaild_infos);
			next();			
		}
		

	});
};
