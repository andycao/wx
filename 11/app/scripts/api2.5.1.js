/**
 * Created by andy on 2015/6/8.
 */
'use strict';

/* api_c02 api接口*/
var useCfApi = function (objPrm, successCallback, errorCallback, completeCallback) {
	$.ajax({
		type: 'get',
		url: 'http://m.cusflo.com/v2.5.1/',
		data: objPrm,
		dataType: 'jsonp',
		jsonp: "callback",
		//timeout: 5000, // sets timeout to 3 seconds
		success: function (json) {
			if(successCallback){
				successCallback(json);
			}
		},
		error: function (json) {
			if (errorCallback) {
				errorCallback(json);
			}
		},
		complete: function (json) {
			if (completeCallback) {
				completeCallback(json);
			}
		}
	});
};

function apiError(json){
	console.log(json);
}

function apiComplete(json){

}
