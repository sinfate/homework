window.onload = function () {
    var flag = true;
    var liC = document.querySelectorAll(".navBox li h2");
    // 主导航nav点击事件
    for (var i = 0; i < liC.length; i++) {
        liC[i].onclick = function () {
            if (flag) {
                // 节流阀
                flag = false;
                setTimeout(function () {
                    flag = true;
                }, 500)
                // 自点
                if (this.className === "obFocus") {
                    this.querySelector("i").classList.remove("arrowRot");
                    getNext(this).style.height = "0";
                    this.classList.add("obtain");
                    this.classList.remove("obFocus");
                    return
                }
                var sec = getNext(this);
                var sib = siblings(sec.parentNode);
                var otherArr = [];
                var arrowClass = [];
                // 排他 secondary arrowRot obFocus
                for (var j = 0; j < sib.length; j++) {
                    var sibSec = sib[j].getElementsByTagName('*');
                    for (var i = 0; i < sibSec.length; i++) {
                        if (sibSec[i].className == "secondary") {
                            otherArr.push(sibSec[i])
                        }
                        if (sibSec[i].className == "arrowRot") {
                            arrowClass.push(sibSec[i])
                        }
                        if (sibSec[i].className == "obFocus") {
                            sibSec[i].classList.remove("obFocus");
                            sibSec[i].classList.add("obtain");
                        }
                    }
                }
                for (var i = 0; i < otherArr.length; i++) {
                    otherArr[i].style.height = "0";
                }
                if (arrowClass[0]) {
                    arrowClass[0].classList.remove("arrowRot");
                }
                // 留自己
                sec.style.height = 1.1 + "rem";
                this.getElementsByTagName("i")[0].classList.add("arrowRot");
                this.classList.remove("obtain");
                this.classList.add("obFocus");
            }
        }
    }
    // 子导航点击事件
    var seconC = document.querySelectorAll(".secondary h3")
    for (var i = 0; i < seconC.length; i++) {
        seconC[i].onclick = function () {
            for (var i = 0; i < seconC.length; i++) {
                seconC[i].classList.remove("seconFocus");
            }
            this.classList.add("seconFocus");
        }
    }
}
function getByClass(clsName, parent) {
    var oParent = parent ? document.getElementById(parent) : document,
        boxArr = new Array(),
        oElements = oParent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
// 获取下一个兄弟元素
function getNext(node) {
    if (!node.nextSibling) return null;
    var nextNode = node.nextSibling;
    if (nextNode.nodeType == 1) {
        return nextNode;
    }
    return getNext(node.nextSibling);
}

// 获取除了自己以外的其他亲兄弟元素
function siblings(elem) {
    var r = [];
    var n = elem.parentNode.firstChild;
    for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
            r.push(n);
        }
    }
    return r;
}
//全屏效果
function launchFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {//兼容各个浏览器
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}
//右侧弹出框
function NeatDialog(sHTML, sTitle, bCancel)
{
 window.neatDialog = null;
 this.elt = null;
 if (document.createElement && document.getElementById)
 {
 var dg = document.createElement("div");
 dg.className = "neat-dialog";
 if (sTitle)
  sHTML = '<div class="neat-dialog-title">'+sTitle+
  ((bCancel)?
  '<img src="x.gif" alt="Cancel" class="nd-cancel" />':'')+
  '</div>\n' + sHTML;
 dg.innerHTML = sHTML;
 var dbg = document.createElement("div");
 dbg.id = "nd-bdg";
 dbg.className = "neat-dialog-bg";
 var dgc = document.createElement("div");
 dgc.className = "neat-dialog-cont";
 dgc.appendChild(dbg);
 dgc.appendChild(dg);
 if (document.body.offsetLeft > 0)
 dgc.style.marginLeft = document.body.offsetLeft + "px";
 document.body.appendChild(dgc);
 if (bCancel) document.getElementById("nd-cancel").onclick = function()
 {
  window.neatDialog.close();
 };
 this.elt = dgc;
 window.neatDialog = this;
 }
}
NeatDialog.prototype.close = function()
{
 if (this.elt)
 {
 this.elt.style.display = "none";
 this.elt.parentNode.removeChild(this.elt);
 }
 window.neatDialog = null;
}
function openDialog()
 {
var sHTML = '<p>假装这是版本消息框</p>'+
  '<p><button onclick="window.neatDialog.close()">关闭</button></p>';
 new NeatDialog(sHTML, false);
}