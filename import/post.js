var http = require('http');
var fs   = require('fs');

var rs = JSON.parse(fs.readFileSync('cleanrecipes.json', 'utf8'));

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

var i = 0;
var iid = setInterval(function() {
    var d = JSON.stringify(rs[i]);
    options.headers['Content-Length'] = d.length;
    var req = http.request(options, function(res) {
        console.log(i-1 + ': '+res.statusCode + ' - ' + rs[i-1].name);
        if (res.statusCode != 200) {
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

