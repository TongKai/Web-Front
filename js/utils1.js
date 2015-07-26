/**
 * Created by lenovo on 2015/7/24.
 */

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn === "function" ? true : false;
}

//深度克隆
function deepClone(obj) {
    var result, oClass = isClass(obj);
    //确定result的类型
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object" || isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);//递归调用
        } else {
            result[key] = copy;
        }
    }
    return result;
}
//返回传递给他的任意对象的类
function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(a[i]);
        if (result.slice(0, -1).indexOf(arr[i]) > -1) {
            result.pop();
        }
    }
    return result;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray2(arr) {

    for (var i = 1; i < arr.length; i++) {
        ;
        if (arr.slice(0, i).indexOf(arr[i]) > -1) {
            arr.splice(i, 1);
            i--;//长度改变，要减一
        }
    }
    return arr;
}

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们
function simpleTrim(str) {
    while (str.indexOf(" ") == 0) {
        str = str.slice(1,str.length)
    }
    while (str.lastIndexOf(" ") == str.length - 1) {
        str = str.slice(0,str.length - 1)
    }
    return str;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    var pattern = /\S+/gi
    var result =  pattern.exec(str);
    return result[0];
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    arr.forEach(fn);
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var i = 0;
    for (var name in obj){
        i++;
    }
    return i;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

//// 其中fn函数可以接受两个参数：item和index
//
//// 使用示例,因为没有重载机制，后面的ouput会覆盖这里的output，所以把后面的output改为moutput
//var arr = ['java', 'c', 'php', 'html'];
//function output(item) {
//    console.log(item)
//}
//each(arr, output);  // java, c, php, html
//
//// 使用示例
//var arr = ['java', 'c', 'php', 'html'];
//function moutput(item, index) {
//    console.log(index + ': ' + item)
//}
//each(arr, moutput);  // 0:java, 1:c, 2:php, 3:html


//var str = '   hi!  ';
////str = simpleTrim(str);
//str = trim(str);
//console.log(str); // 'hi!'

//var a = [1, 3, 5, 7, 5, 3,3,4,5];
//var b = uniqArray2(a);
//console.log(b); // [1, 3, 5, 7]

//var srcObj = {
//    a: 1,
//    b: {
//        b1: ["hello", "hi"],
//        b2: "JavaScript"
//    },
//    c: new Date()
//};
//
//var obj = deepClone(srcObj);
//srcObj.a = 2;
//srcObj.b.b1[0] = "Hello";
//console.log(srcObj);
//console.log(obj);

//console.log(isArray([1,2]));
//console.log(isArray("1"));
//console.log(isFunction(isArray));
//console.log(isFunction(2));


