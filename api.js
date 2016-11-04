var sqlite = require('sqlite3');
var dbfile = "test.db";
var db = new sqlite.Database(dbfile);

var http = require('http');
var url = require('url');

var express = require('express');
var restapi = express();

restapi.get('/', function(req, res){
	res.send('hello ROOT world');
});

restapi.get("/eaters",function(req,res){
	db.all("select * from eaters",function(err,data){
		res.header('Access-Control-Allow-Origin', '*');
		res.send(data);
	});
});
restapi.get("/restaurant",function(req,res){
	db.all("select * from restaurant",function(err,data){
		res.header('Access-Control-Allow-Origin', '*');
		res.send(data);
	});
});
restapi.get("/wallet",function(req,res){
	db.all("select * from wallet",function(err,data){
		res.header('Access-Control-Allow-Origin', '*');
		res.send(data);
	});
});
restapi.get("/detail",function(req,res){
	db.all("select * from detail order by date DESC limit 5",function(err,data){
		res.header('Access-Control-Allow-Origin', '*');
		res.send(data);
	});
});
restapi.get("/all",function(req,res){
	db.all("select * from detail order by date DESC",function(err,data){
		res.header('Access-Control-Allow-Origin', '*');
		res.send(data);
	});
});

var url = require('url');
restapi.get("/addBill",function(req,res){
	res.header('Access-Control-Allow-Origin', '*');
	var param = [];
	param = url.parse(req.url,true).query;
	var date = param.year+'-'+param.month+'-'+param.day;
	var eatersnum = param.attendees.length;
	var each = new Number(param.total/eatersnum);
	each = each.toFixed(4);
  var eaters = param.attendees.join(',');
	var mark = 0;
	db.serialize(function(mark){
	//mark=++ if date exist
	db.all("select * from detail where date=?",[date],function(err,rows){
		if(err){res.send("DB failure:"+err);};
	  mark = rows.length;
	});
console.log(mark);	
	db.run("insert into detail (date,host,restaurant,total,eaters,each,comments,mark,eatersnum) values (?,?,?,?,?,?,?,?,?)",[date,param.host,param.restaurant,param.total,eaters,each,param.comments,mark,eatersnum]);
	});
	//update table wallet
	//select change from wallet where mail=mxchi => ori
	param.attendees.forEach(function(currentValue,index,array){
		db.get("select change from wallet where mail=?",[currentValue],function(err, row){
	    var newchange;
			if(currentValue === param.host){
		    newchange = row.change + param.total - each;	
			}
	    newchange = row.change  - each;
			console.log(currentValue);
			console.log(row.change-each);
			db.run("update wallet set change=? where mail=?",[newchange,currentValue]);
		});
	});
	res.send('addBill and '+Object.keys(param)+" and "+date+param.restaurant+eaters);
});
restapi.listen(3000);
console.log("server start at port 3000");
