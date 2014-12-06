#!/usr/bin/env node
var request = require('superagent');
var program = require('commander');
var chalk = require('chalk');

var isChinese = function(str)
{
    var reg = /[\u4e00-\u9fa5]+/;
    return reg.test(str);
}


module.exports = function(word,callback){
    var postData ={
        from: isChinese(word) ? 'zh':'en',
        to: isChinese(word) ? 'en':'zh',
        query:word
    };
    request.post('http://fanyi.baidu.com/v2transapi')
        .set('Content-Type','application/x-www-form-urlencoded')
        .send(postData).end(function(err,res){
            if(err) throw err;
            if(res.body && res.body.trans_result){
                callback(res.body.trans_result.data[0].dst);
            }

    })
}