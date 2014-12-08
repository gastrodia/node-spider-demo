#!/usr/bin/env node
console.log('plant-spider');
var request = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var getImgUrl = function($element){
    return  $element.find('img').attr('src');
}

var getImgName = function($element){
    return $element.find('img').parent().attr('title');
}

/*
 If-Modified-Since:Thu, 01 Jan 1970 00:00:00 GMT
 If-None-Match:79608c30b88cd389e7e2816b008c58e7

*/

var downloadImg = function(imgName,imgUrl){
    request.get(imgUrl)
        .set('Accept','image/webp,*/*;q=0.8')
        .set('Accept-Encoding','gzip,deflate,sdch')
        .set('Accept-Language','en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4')
        .set('Cache-Control','max-age=0')
        .set('Connection','keep-alive')
        .set('Host','t12.baidu.com')
        .set('Referer','http://www.baidu.com/s?wd=%E6%A4%8D%E7%89%A9')
        .set('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36')
        .end(function(err,res){
            var buffer = res.body;
            var imgDir = path.join(__dirname,'../img');
            var fd = path.join(imgDir,imgName + '.jpg');
            fs.writeFile(fd, buffer, function(err){
                if(err) throw err;
                console.log(imgName + 'save success!');
            });
    });
}

request.get('http://www.baidu.com/s?wd=%E6%A4%8D%E7%89%A9')
    .end(function(err,res){
        $ = cheerio.load(res.text);

        var imgElementList = $('.op_exactqa_body').find('.op_exactqa_item');
        imgElementList.each(function(index,element){
            var $element = $(this);
            var imgUrl = getImgUrl($element);
            var imgName = getImgName($element);
            downloadImg(imgName,imgUrl);
        });


    });