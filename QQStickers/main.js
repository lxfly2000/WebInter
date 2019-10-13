// JavaScript Document
function SaveText(str){
	"use strict";
	if(localStorage){
		localStorage.setItem("te1",str);
	}
}

function LoadText(){
	"use strict";
	if(localStorage){
		return localStorage.getItem("te1")||"11449";
	}
}

function isAutoUpdateChecked(){
	"use strict";
	return document.getElementById("checkAutoUpdate").checked;
}

function changeId(interval){
	"use strict";
	var id=parseInt(window.editId.value);
	id+=interval;
	id=Math.max(id,0);
	window.editId.value=id;
	if(isAutoUpdateChecked()){
		window.buttonGoto.click();
	}
}

(function(){
	"use strict";
	window.editId=document.getElementById("editId");
	window.buttonGoto=document.getElementById("buttonGoto");
	window.buttonToPrev=document.getElementById("buttonToPrev");
	window.buttonToNext=document.getElementById("buttonToNext");
	window.textTitle=document.getElementById("textTitle");
	window.imgPreview=document.getElementById("imgPreview");
	window.textDesc=document.getElementById("textDesc");
	window.imgSplash=document.getElementById("imgSplash");
	window.listImages=document.getElementById("listImages");
	window.textTags=document.getElementById("textTags");
	window.linkDownload=document.getElementById("linkDownload");
	window.linkUrl=document.getElementById("linkUrl");
	window.emIcon=document.getElementById("emIcon");
	
	window.editId.addEventListener("change",function(){
		if(isAutoUpdateChecked()){
			window.buttonGoto.click();
		}
	});
	window.buttonGoto.onclick=function(){
		queryId(window.editId.value);
	};
	window.buttonToPrev.onclick=function(){
		changeId(-1);
	};
	window.buttonToNext.onclick=function(){
		changeId(1);
	};
	window.editId.setAttribute("min","0");
	window.editId.value=LoadText();
	window.buttonGoto.click();
	
	document.addEventListener("keyup",function(e){
		if(e.keyCode===37){
			window.buttonToPrev.click();
		}else if(e.keyCode===39){
			window.buttonToNext.click();
		}
	});
}());

function queryId(id){
	"use strict";
	window.linkUrl.href="https://gxh.vip.qq.com/club/themes/mobile/bq/html/detail.html?id="+id;
	var idStr=id.toString();
	SaveText(idStr);
	window.imgPreview.src="https://imgcache.qq.com/club/item/parcel/img/parcel/"+idStr.substr(idStr.length-1,1)+"/"+id+"/286x166.jpg";
	window.imgSplash.src="https://imgcache.qq.com/club/item/parcel/"+idStr.substr(idStr.length-1,1)+"/"+id+"/title.png";
	/*var xhr=new XMLHttpRequest();
	var qUrlCd="https://imgcache.qq.com/qqshow/admindata/comdata/vipEmoji_item_"+id;
	var qUrl=qUrlCd+"/xydata.json";
	xhr.open("GET",qUrl,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			showData(xhr.status,qUrlCd,xhr.responseText);
		}
	};
	xhr.send(null);*/
}

function createImgTag(url,alt){
	"use strict";
	var node=document.createElement("img");
	node.src=url;
	node.alt=alt;
	return node;
}

function showData(response,cd,jsonStr){
	"use strict";
	if(response!==200){
		window.textTitle="HTTP 错误："+response;
		return;
	}
	var xydata=JSON.parse(jsonStr);
	var baseInfo=xydata.baseInfo[0];
	var md5Info=xydata.md5Info;
	window.linkDownload.href=cd+"/"+baseInfo.zip;
	window.textTags.innerText=baseInfo.tag;
	window.textDesc.innerText=baseInfo.desc;
	window.textTitle.innerText=baseInfo.name;
	//TODO
}