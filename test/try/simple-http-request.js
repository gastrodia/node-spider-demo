/**
 * Created by yang on 14/12/6.
 */
var http = require('http');
var request = http.request({
    host:'www.baidu.com',
    port:80,
    path:'/'
},function(response){
    var buffer = '';
    response.on('data', function (chunk) {
       buffer += chunk;
    });
    response.on('end', function () {
        console.log(buffer);
    });
});


//设置超时20s
request.setTimeout(1000*20,function(){
    console.log('http timeout..');
    request.abort();
});

request.on('error', function(error) {
    throw error;
});

request.end();