/**
 * Created by andy on 2015/6/2.
 */

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
	var imgurl = '';

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
				api: "306",
				mobile: form.mobile.value,
				company: form.company.value,
				nick: form.nick.value,
				desc: form.desc.value,
				address: form.address.value,
				imgurl: imgurl
			}, function (json) {

				$("#ok").hide();
				$("#success").removeClass("hide");
				$(".container h1").text("您的反馈已成功！");

			}, apiError, apiComplete);
		}
	});

	$("#success").click(function(){
		history.back();
	});

	//getKey(function(json){
	//	console.log(json);
	//});

		//更改图片
		$('#file').change(function(){
			//上传图片 保存url
			uploadImg(this.files[0], function(json){

				console.log(json.data);
				imgurl = json.data;

			});
		});
});

function checkform(f){
	if( !f.nick.value ){
		alert('没昵称不好称呼您啊');
		$(f.nick).focus();

		return false;
	}
	if( !cphone(f.mobile.value) ){
		alert('需要联系方式才能帮您解决问题');
		$(f.mobile).focus();
		return false;
	}
	if( !f.company.value ){
		alert('请填写店铺名称');
		$(f.company).focus();

		return false;
	}
	if( !f.address.value ){
		alert('请填写店铺地址');
		$(f.address).focus();

		return false;
	}
	if(f.desc.value == ''){
		alert('请填写问题描述');
		$(f.desc).focus();

		return false;
	}
	return true;
}

function cphone(num) {
	/* 检测号码 */
	var RegCellPhone = /^\+?\d+$/;

	return RegCellPhone.test(num);
}


