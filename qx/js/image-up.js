	
  //新上传图片方法***********************************************************
	//使用时传入file图片文件，callback执行jspn数据处理，data为图片url
	function uploadImg( file, callback){

		//定义上传
		var fileupload = function (file, token, success) {
			var formdata = new FormData();
			formdata.append("token", token);
			formdata.append("file", file);
			$.ajax({
				type: 'POST',
				url: 'http://upload.qiniu.com/',
				cache: false,
				contentType: false,
				processData: false,
				data: formdata,
				success: function (data) {
					if(success){
						success(data);
					}
				}
			});
		};

		//get token
		getKey(function(key){
			//get file uploaded
			fileupload( file , key, callback);
		});
	}

	//获得token
	function getKey(callback){
		$.ajax({
			type: 'get',
			url: 'http://cusflo.com/api/base/qiniuopen.php?action=feedback',
			success: function (data) {
				var out = JSON.parse(data);
				callback(out.data);
			},
			error: function (data) {
			},
			complete: function (data) {
			}
		});
	}

