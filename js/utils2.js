// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var node = document.getElementById(element);
    if (node) {
        node.className = newClassName;
    }


}

//addClass("p1", "pp");

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var node = document.getElementById(element);
    if (node) {
        node.className = node.className.replace(new RegExp("(\\s|^)" + oldClassName + "(\\s|$)"), " ");
    }
}
//removeClass("p1", "pp");

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return document.getElementById(element).parentNode.nodeName === document.getElementById(siblingNode).parentNode.nodeName;
}
//console.log(isSiblingNode("p1", "s"));

//获取网页的大小
//document元素的clientHeight和clientWidth属性，就代表了网页的大小,不包括border和滚动条占用的空间
function getViewport() {
    if (document.compatMode == "BackCompat") {
        //针对IE6的quirks模式
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}
//console.log(getViewport());

//包含滚动条隐藏的内容该元素的视觉面积
function getPagearea() {
    if (document.compatMode == "BackCompat") {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}
//这个函数有一个问题。如果网页内容能够在浏览器窗口中全部显示，不出现滚动条，那么网页的clientWidth和scrollWidth应该相等。
// 但是实际上，不同浏览器有不同的处理，这两个值未必相等。所以，我们需要取它们之中较大的那个值
function getPagearea2() {
    if (document.compatMode == "BackCompat") {
        return {
            width: Math.max(document.body.scrollWidth, document.body.clientWidth),
            height: Math.max(document.body.scrollHeight, document.body.clientHeight)
        }
    } else {
        return {
            width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
        }
    }
}
//console.log(getPagearea2());

//获取网页元素的绝对位置,相对于整张网页左上角的坐标
// offsetTop和offsetLeft属性，表示该元素的左上角与父容器（offsetParent对象）左上角的距离
//由于在表格和iframe中，offsetParent对象未必等于父容器，对于表格和iframe中的元素不适用
function getAbsolutePosition(element) {
    var node = document.getElementById(element);
    var absoluteX = node.offsetLeft;
    var absoluteY = node.offsetTop;
    var current = node.offsetParent;
    while (current) {
        absoluteX += current.offsetLeft;
        absoluteY += current.offsetTop;
        current = current.offsetParent;
    }
    return {
        x: absoluteX,
        y: absoluteY
    }
}
//console.log(getAbsolutePosition("s"));

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
//将绝对坐标减去页面的滚动条滚动的距离
//xhtml不支持document.body.scrollTop
//当为html文档加上支持xhtml过渡标准时候，使用document.body.scrollTop值始终为0
//<!DOCTYPE html PUBLIC ”-//W3C//DTD XHTML 1.0 Transitional//EN” ”http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
//需要用document.documentElement.scrollTop才能获得正确的值，
// 而如果不加xhtml的申明,必须用document.body.scrollTop获得其值，此时document.documentElement.scrollTop将为0
function getPosition(element) {

    var absolutePosition = getAbsolutePosition(element);
    if (document.compatMode == "BackCompat" || document.doctype.systemId.match("xhtml")) {
        return {
            x: absolutePosition.x - document.body.scrollLeft,
            y: absolutePosition.y - document.body.scrollTop
        }
    } else {
        return {
            x: absolutePosition.x - document.documentElement.scrollLeft,
            y: absolutePosition.y - document.documentElement.scrollTop
        }
    }
}
//console.log(getPosition("s"));

//获取element相对于浏览器窗口的位置的快捷方法
function getPositionQuick(element) {
    var node = document.getElementById(element);
    if (document.compatMode == "BackCompat") {
        return {
            relativeX: node.getBoundingClientRect().left,
            relativeY: node.getBoundingClientRect().top,
            absoluteX: node.getBoundingClientRect().left + document.body.scrollLeft,
            absoluteY: node.getBoundingClientRect().top + document.body.scrollTop
        }
    } else {
        return {
            relativeX: node.getBoundingClientRect().left,
            relativeY: node.getBoundingClientRect().top,
            absoluteX: node.getBoundingClientRect().left + document.documentElement.scrollLeft,
            absoluteY: node.getBoundingClientRect().top + document.documentElement.scrollTop
        }
    }

}
//console.log(getPositionQuick("s"));

// 实现一个简单的Query
function $(selector) {
    var pattern = /#\w+|\.\w+|\w+|\[\w+=?\w+\]/gi;
    var s;
    while ((s = pattern.exec(selector)) != null){
      return arguments.callee(s)[0]
    }
    var flag = selector.slice(0, 1);
    var name = selector.slice(1, selector.length);
    if (flag === "#") {
        return document.getElementById(name);
    } else if (flag === ".") {
        return getElementByClaass(name);
    } else if (flag === "[") {
        return getElementByAttribute(name);
    }else {
        return document.getElementsByTagName(selector);
    }
}
function getElementByClaass(name) {
    var allElements = document.getElementsByTagName("*");
    var results = [];
    var pattern = /\w+/gi;
    for (var i = 0; i < allElements.length; i++) {
        pattern.lastIndex = 0;
        while ((temp = pattern.exec(allElements[i].className)) != null) {
            if (temp == name) {
                results.push(allElements[i]);
            }
        }
    }
    return results;
}
function getElementByAttribute(name) {
    console.log(name);
    var allElements = document.getElementsByTagName("*");
    var results = [];
    name = name.slice(0, -1);
    if (name.split("=").length > 1) {
        var value = name.split("=")[1];
        name = name.split("=")[0];
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].getAttributeNode(name)
                && allElements[i].getAttributeNode(name).value == value) {
                results.push(allElements[i]);
            }
        }
    } else {
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].getAttributeNode(name)) {
                results.push(allElements[i]);
            }
        }
    }
    return results;
}
//console.log($("#p1"));
//console.log($(".c"));
//console.log($("p"));
//console.log($("[data-log]"));
//console.log($("[data-log=d]"));
console.log($("#a .b"));
//// 可以通过id获取DOM对象，通过#标示，例如
//$("#adom"); // 返回id为adom的DOM对象
//
//// 可以通过tagName获取DOM对象，例如
//$("a"); // 返回第一个<a>对象
//
//// 可以通过样式名称获取DOM对象，例如
//$(".classa"); // 返回第一个样式定义包含classa的对象
//
//// 可以通过attribute匹配获取DOM对象，例如
//$("[data-log]"); // 返回第一个包含属性data-log的对象
//
//$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
//
//// 可以通过简单的组合提高查询便利性，例如
//$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象