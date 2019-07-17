const connect = require('./Connection');


function ShowEquip(request, response) {
    connect.connection.beginTransaction(function () {
        connect.connection.query("SELECT id,name,availability,owner FROM equipment", function (err, result) {
            if (err)
                throw err;
            response.send(result);
        });
    });
    return request;
}


function ShowPicked(request,response,body){
    connect.connection.beginTransaction(function () {
        const sql = `SELECT * FROM equipment WHERE name = "${body}"`;
        connect.connection.query(sql,function (err,result) {
            if(err)
                throw err;
            response.send(result[0]);
        })
    })
}


module.exports.ShowPicked = ShowPicked;
module.exports.ShowEquip = ShowEquip;