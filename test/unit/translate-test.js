/**
 * Created by yang on 14/12/6.
 */
var translate = require('../../src/translate');

translate('你好中国', function(result) {
    console.log(result);
});

translate({
    from: 'en',
    to: 'zh',
    query: 'Hello China'
}, function(result) {
    console.log(result);
});