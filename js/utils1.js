/**
 * Created by lenovo on 2015/7/24.
 */

// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
function isArray(arr) {
    return arr instanceof Array;
}

// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ
function isFunction(fn) {
    return typeof fn === "function" ? true : false;
}

//��ȿ�¡
function deepClone(obj) {
    var result, oClass = isClass(obj);
    //ȷ��result������
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
            result[key] = arguments.callee(copy);//�ݹ����
        } else {
            result[key] = copy;
        }
    }
    return result;
}
//���ش��ݸ���������������
function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
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
// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
function uniqArray2(arr) {

    for (var i = 1; i < arr.length; i++) {
        ;
        if (arr.slice(0, i).indexOf(arr[i]) > -1) {
            arr.splice(i, 1);
            i--;//���ȸı䣬Ҫ��һ
        }
    }
    return arr;
}

// ʵ��һ���򵥵�trim����������ȥ��һ���ַ�����ͷ����β���Ŀհ��ַ�
// �ٶ��հ��ַ�ֻ�а�ǿո�Tab
// ��ϰͨ��ѭ�����Լ��ַ�����һЩ�����������ֱ�ɨ���ַ���strͷ����β���Ƿ��������Ŀհ��ַ�������ɾ������
function simpleTrim(str) {
    while (str.indexOf(" ") == 0) {
        str = str.slice(1,str.length)
    }
    while (str.lastIndexOf(" ") == str.length - 1) {
        str = str.slice(0,str.length - 1)
    }
    return str;
}

// ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
// ����ʹ��һ�м���������ʽ��ɸ���Ŀ
function trim(str) {
    var pattern = /\S+/gi
    var result =  pattern.exec(str);
    return result[0];
}

// ʵ��һ����������ķ��������������ÿһ��Ԫ��ִ��fn��������������������Ԫ����Ϊ��������
function each(arr, fn) {
    arr.forEach(fn);
}

// ��ȡһ�����������һ��Ԫ�ص�����������һ������
function getObjectLength(obj) {
    var i = 0;
    for (var name in obj){
        i++;
    }
    return i;
}

// ʹ��ʾ��
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

//// ����fn�������Խ�������������item��index
//
//// ʹ��ʾ��,��Ϊû�����ػ��ƣ������ouput�Ḳ�������output�����԰Ѻ����output��Ϊmoutput
//var arr = ['java', 'c', 'php', 'html'];
//function output(item) {
//    console.log(item)
//}
//each(arr, output);  // java, c, php, html
//
//// ʹ��ʾ��
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


