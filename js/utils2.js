// Ϊelement����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    var node = document.getElementById(element);
    if (node) {
        node.className = newClassName;
    }


}

//addClass("p1", "pp");

// �Ƴ�element�е���ʽoldClassName
function removeClass(element, oldClassName) {
    var node = document.getElementById(element);
    if (node) {
        node.className = node.className.replace(new RegExp("(\\s|^)" + oldClassName + "(\\s|$)"), " ");
    }
}
//removeClass("p1", "pp");

// �ж�siblingNode��element�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(element, siblingNode) {
    return document.getElementById(element).parentNode.nodeName === document.getElementById(siblingNode).parentNode.nodeName;
}
//console.log(isSiblingNode("p1", "s"));

//��ȡ��ҳ�Ĵ�С
//documentԪ�ص�clientHeight��clientWidth���ԣ��ʹ�������ҳ�Ĵ�С,������border�͹�����ռ�õĿռ�
function getViewport() {
    if (document.compatMode == "BackCompat") {
        //���IE6��quirksģʽ
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

//�������������ص����ݸ�Ԫ�ص��Ӿ����
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
//���������һ�����⡣�����ҳ�����ܹ��������������ȫ����ʾ�������ֹ���������ô��ҳ��clientWidth��scrollWidthӦ����ȡ�
// ����ʵ���ϣ���ͬ������в�ͬ�Ĵ���������ֵδ����ȡ����ԣ�������Ҫȡ����֮�нϴ���Ǹ�ֵ
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

//��ȡ��ҳԪ�صľ���λ��,�����������ҳ���Ͻǵ�����
// offsetTop��offsetLeft���ԣ���ʾ��Ԫ�ص����Ͻ��븸������offsetParent�������Ͻǵľ���
//�����ڱ���iframe�У�offsetParent����δ�ص��ڸ����������ڱ���iframe�е�Ԫ�ز�����
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

// ��ȡelement�������������ڵ�λ�ã�����һ������{x, y}
//�����������ȥҳ��Ĺ����������ľ���
//xhtml��֧��document.body.scrollTop
//��Ϊhtml�ĵ�����֧��xhtml���ɱ�׼ʱ��ʹ��document.body.scrollTopֵʼ��Ϊ0
//<!DOCTYPE html PUBLIC ��-//W3C//DTD XHTML 1.0 Transitional//EN�� ��http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd��>
//��Ҫ��document.documentElement.scrollTop���ܻ����ȷ��ֵ��
// ���������xhtml������,������document.body.scrollTop�����ֵ����ʱdocument.documentElement.scrollTop��Ϊ0
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

//��ȡelement�������������ڵ�λ�õĿ�ݷ���
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

// ʵ��һ���򵥵�Query
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
//// ����ͨ��id��ȡDOM����ͨ��#��ʾ������
//$("#adom"); // ����idΪadom��DOM����
//
//// ����ͨ��tagName��ȡDOM��������
//$("a"); // ���ص�һ��<a>����
//
//// ����ͨ����ʽ���ƻ�ȡDOM��������
//$(".classa"); // ���ص�һ����ʽ�������classa�Ķ���
//
//// ����ͨ��attributeƥ���ȡDOM��������
//$("[data-log]"); // ���ص�һ����������data-log�Ķ���
//
//$("[data-time=2015]"); // ���ص�һ����������data-time��ֵΪ2015�Ķ���
//
//// ����ͨ���򵥵������߲�ѯ�����ԣ�����
//$("#adom .classa"); // ����idΪadom��DOM�������������ӽڵ��У���һ����ʽ�������classa�Ķ���