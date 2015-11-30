var http = require('http');
var fs   = require('fs');

var rs = JSON.parse(fs.readFileSync('recipes.json'));

var options = {
    hostname: 'localhost',
    port:8080,
    path: '/api/recipes',
    method: 'POST',
    headers: {
        'Content-Type': 'Application/json'
    }
};

console.log(rs.length);

var i = 916;
var iid = setInterval(function() {
    var d = JSON.stringify(rs[i]);
    options.headers['Content-Length'] = d.length;
    var req = http.request(options, function(res) {
        if (res.statusCode != 200) {
            console.log(i + ': '+res.statusCode);    
            console.log(rs[i].name);
            res.setEncoding('utf8');
            res.on('data', function(c) {
                console.log(c);
            });
        }
    });
    req.write(d);
    req.end();
    i+=1;
    if (i >= rs.length) clearInterval(iid);
}, 200);

