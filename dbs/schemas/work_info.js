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
module.exports.getWorkInfo = function getWorkInfo(req, res, next){

	workInfo.findOne({midAddress:'0000000000'}, function(err, info){
	
		var vaild_info = 
		{
			address:'',
			data:[]
		};
		
		if (err)
		{
			console.log("no work informations");
			
			res.send(201);
			
			next();
		}
		else
		{
			vaild_info.address = info.address;
			vaild_info.data = info.data;
			
			res.setHeader('Content-Type', 'text/html');
			res.send(JSON.stringify(vaild_info));
			
			next();			
		}
		

	});
};
