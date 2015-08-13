/**
 * Created by andy on 2015/6/2.
 */

	//图片
var imgurl = '';

var openApi = function (objPrm, successCallback, errorCallback, completeCallback) {
	$.ajax({
		type: 'get',
		url: 'http://cusflo.com/api/base/api_open.php',
		data: objPrm,
		dataType: 'jsonp',
		jsonp: "callback",
		success: function (data) {
			if (successCallback) {
				successCallback(data);
			}
		},
		error: function (data) {
			if (errorCallback) {
				errorCallback(data);
			}
		},
		complete: function (data) {
			if (completeCallback) {
				completeCallback(data);
			}
		}
	});
};

function apiError(json){
	console.error('api error:');
	console.error(json);
}
function apiComplete(json){

}

$(document).ready(function(){

	$('#myclose').click(function(){
		wx.closeWindow();
	});

	$('#upload').click(function(){
		$('#file').trigger('click');
	});

	var form = document.getElementById("myform");
	$('#ok').click(function(){

		if( checkform(form) ) {
			openApi({
				api: "308",
				mobile: form.mobile.value,
				nick: form.nick.value,
				desc: form.desc.value,
				imgurl: imgurl
			}, function (json) {
				console.log('success');
				//重置表单
				form.reset();
				alert("您的申请正在审核中...");
				location.href = "index.html";

			}, apiError, apiComplete);
		}
	});

	$("#success").click(function(){
		history.back();
	});

		//更改图片
		$('#file').change(function(){

			//imgurl = "http://7xjrtc.com2.z0.glb.qiniucdn.com/images/bg.jpg";
			//$("#picShow").show().attr("src", imgurl);

			//上传图片 保存url
			uploadImg(this.files[0], function(json){

				console.log(json.data);
				imgurl = json.data;

				$("#picShow").show().attr("src", imgurl);
			});
		});
});

function checkform(f){
	if( !f.nick.value ){
		alert('有了昵称才方便称呼');
		$(f.nick).focus();

		return false;
	}
	if( !cphone(f.mobile.value) ){
		alert('发奖品需要您的手机哦');
		$(f.mobile).focus();
		return false;
	}
	if(f.desc.value == ''){
		alert('请阐述您对爱的表达');
		$(f.desc).focus();

		return false;
	}
	if( !imgurl ){
		alert("请上传爱的图片");
		return false;
	}
	return true;
}

function cphone(num) {
	/* 检测号码 */
	//var RegCellPhone = /^\+?\d+$/;
	var RegCellPhone = /^\d{11}$/;

	return RegCellPhone.test(num);
}

