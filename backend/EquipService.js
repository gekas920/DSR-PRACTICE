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

module.exports.ShowEquip = ShowEquip;