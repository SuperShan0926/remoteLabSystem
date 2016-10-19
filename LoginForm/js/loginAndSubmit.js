$('#passwordsignup_confirm').change(function(event) {
	if($('#passwordsignup_confirm').val()!==$('#passwordsignup').val()){
		$('#tipsPass').html('两次密码输入不一致!');
		$('#tipsPass').css({color: 'red'});
	}
	else{
		$('#tipsPass').html('✅');
	}
});

function check() {
	return false;
}

function register() {
	var a = $('#usernamesignup').val().trim();
	var b = $('#passwordsignup').val().trim();
	if($('#usernamesignup').val().trim()===''){
		$('#tips').html('用户名不能为空!');
		$('#tips').css({color: 'red'});
		return;
	}
	if($('#passwordsignup_confirm').val().trim()===''||$('#passwordsignup').val().trim()===''){
		$('#tipsPass').html('密码不能为空!');
		$('#tipsPass').css({color: 'red'});
		return;
	}
	if($('#passwordsignup_confirm').val()!==$('#passwordsignup').val()){
		$('#tipsPass').html('两次密码输入不一致!');
		$('#tipsPass').css({color: 'red'});
		return;
	}
	$.post('/user/register',{
		username:$('#usernamesignup').val().trim(),
		password:$('#passwordsignup').val().trim()
	},function (data) {
		$('#tipsPass').html(data);
		if(data.toString()==='注册成功'){
			location.href = 'http://localhost:3000/login.html#tologin';
		}
	});
}

function login() {
	$.post('/user/login',{
		username:$('#username').val().trim(),
		password:$('#password').val().trim()
	},function (data) {
		alert(data);
		if(data.toString()==='登录成功!'){
			location.href='/index.html';
		}
	});
}


