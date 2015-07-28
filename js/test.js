/*练习文件*/
/*闭包练习*/
var MODULE = (function () {
    var my = {},
    	privateVariable = 1;
    function privateMethod() {
        // ...
    }
    my.moduleProperty = 1;
    my.moduleMethod = function () {
        // ...
    };
    return my;
}());

var MODULE = (function (my) {
    my.anotherMethod = function () {
        // 此前的MODULE返回my对象作为全局输出，因此这个匿名函数的参数MODULE就是上面MODULE匿名函数里的my
    };
 
    return my;
}(MODULE));


var MODULE = (function(my){
	
	return my;
}(MODULE));
