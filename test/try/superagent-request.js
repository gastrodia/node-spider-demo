/**
 * Created by yang on 14/12/6.
 */
var request = require('superagent');

request.get('http://www.baidu.com')
    .timeout(1000*20)
    .end(function(err,res){
        if(err) throw err;
        console.log(res.text);
    })