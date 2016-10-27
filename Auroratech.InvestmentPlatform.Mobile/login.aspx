<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="Auroratech.InvestmentPlatform.Mobile.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style>
        * {
            font-family: 'Microsoft YaHei';
        }

        html, body {
            margin: 0;
            padding: 0;
            border: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        body {
            background-color: #3ab5e9;
            position: relative;
        }

        .zspt-login .login {
            height: 900px;
            width: 1600px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -450px;
            margin-left: -800px;
            background-image: url(images/mobile-login.png);
        }

        .zspt-login .bottom-info {
            position: fixed;
            bottom: 20px;
            width: 100%;
            text-align: center;
            color: white;
            font-size: 18px;
        }

        .zspt-login .login .panel {
            position: absolute;
            right: 360px;
            top: 380px;
            height: 280px;
            width: 400px;
            background-color: #ecf9ff;
            border: 5px #ecf9ff solid;
            border-radius: 5px;
        }

            .zspt-login .login .panel input {
                outline: none;
                position: absolute;
                height: 50px;
                line-height: 50px;
                width: 280px;
                left: 40px;
                border: 1px solid #3ab5e9;
                border-radius: 5px;
                padding: 0 20px;
                font-size: 18px;
            }

                .zspt-login .login .panel input[type=text] {
                    top: 40px;
                }

                .zspt-login .login .panel input[type=password] {
                    top: 110px;
                }

                .zspt-login .login .panel input[type=button] {
                    width: 320px;
                    top: 180px;
                    color: white;
                    font-weight: 700;
                    background-color: #3ab5e9;
                    cursor: pointer;
                }

        #btn_modify_password {
            position: absolute;
            bottom: 10px;
            right: 50px;
            font-size: 16px;
            color: #3ab5e9;
            cursor: pointer;
        }

        .zspt-login .modifypassword {
            display: none;
            position: fixed;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
        }

            .zspt-login .modifypassword table {
                width: 100%;
                position: absolute;
                height: 300px;
                width: 500px;
                top: 50%;
                left: 50%;
                margin-top: -150px;
                margin-left: -250px;
                background-color: white;
                padding: 20px;
                border-radius: 5px;
            }

                .zspt-login .modifypassword table input {
                    height: 50px;
                    line-height: 50px;
                    border: 1px solid #3ab5e9;
                    padding: 0 5px;
                    border: 1px solid #3ab5e9;
                    border-radius: 5px;
                    font-size: 18px;
                }

                .zspt-login .modifypassword table th {
                    text-align: right;
                    padding-right: 20px;
                }

                .zspt-login .modifypassword table input {
                    outline: none;
                }

                    .zspt-login .modifypassword table input[type=password], .zspt-login .modifypassword table input[type=text] {
                        width: 80%;
                    }

                    .zspt-login .modifypassword table input[type=button] {
                        width: 120px;
                        background-color: #3ab5e9;
                        color: white;
                        font-weight: 700;
                    }
    </style>
</head>
<body class="zspt-login">
    <div class="login">
        <div class="panel">
            <input id="user_name" type="text" placeholder="请输入用户名" />
            <input id="user_password" type="password" placeholder="请输入密码" />
            <input id="btn_login" type="button" value="登&nbsp;&nbsp;录" />
            <label id="btn_modify_password">修改密码</label>
        </div>
    </div>
    <div class="bottom-info">
        版权所有：无锡市新区管理委员会&nbsp;&nbsp;&nbsp;&nbsp;技术支持：林慧科技有限公司
    </div>

    <div class="modifypassword">
        <table>
            <tr>
                <th style="width: 35%;">用户名</th>
                <td style="width: 65%;">
                    <input id="mf_user_name" type="text" />
                </td>
            </tr>
            <tr>
                <th>密码</th>
                <td>
                    <input id="mf_user_password_old" type="password" /></td>
            </tr>
            <tr>
                <th>新密码</th>
                <td>
                    <input id="mf_user_password_new" type="password" /></td>
            </tr>
            <tr>
                <th>确认新密码</th>
                <td>
                    <input id="mf_user_password_new_c" type="password" /></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <input id="mf_ok" type="button" value="确 定" />&nbsp;&nbsp;&nbsp;&nbsp;<input id="mf_cancel" type="button" value="取 消" />
                </td>
            </tr>
        </table>
    </div>
    <script src="js/ref/jquery-easyui-1.4.4/jquery.min.js"></script>
    <script>
        $(function () {
            var $user_name = $('#user_name');
            var $user_password = $('#user_password');
            var $btn_login = $('#btn_login');
            $btn_login.click(login);

            function login() {
                var name = $.trim($user_name.val());
                var password = $.trim($user_password.val());

                if (name == '' || password == '') {
                    alert("用户名、密码不能为空！");
                } else {
                    $.post('service/CommonHandler.ashx?action=Login', {
                        USERNAME: name,
                        PASSWORD: password
                    }, function (data) {
                        if (data == "1") {
                            window.location.href = 'map.aspx';
                        } else {
                            alert('用户名或密码不正确！');
                        }
                    }, 'text');
                }
            }
            $user_name.focus(selectText);
            $user_password.focus(selectText);
            function selectText() {
                $(this).select();
            }

            var $btn_modify_password = $('#btn_modify_password');
            $btn_modify_password.click(function () {
                $('.modifypassword').css('display', 'block');
            });

            $('#mf_ok').click(function () {
                modifyPassword();
            });

            $('#mf_cancel').click(function () {
                $('.modifypassword').css('display', 'none');
            });

            function modifyPassword() {
                var $mf_user_name = $('#mf_user_name');
                var $mf_user_password_old = $('#mf_user_password_old');
                var $mf_user_password_new = $('#mf_user_password_new');
                var $mf_user_password_new_c = $('#mf_user_password_new_c');

                var user_name = $.trim($mf_user_name.val());
                var user_password_old = $.trim($mf_user_password_old.val());
                var user_password_new = $.trim($mf_user_password_new.val());
                var user_password_new_c = $.trim($mf_user_password_new_c.val());
                if (user_name == '' || user_password_old == '' || user_password_new == '') {
                    alert('用户名或密码不能为空！');
                    return;
                } else if (user_password_new_c != user_password_new_c) {
                    alert('两次输入的新密码不一致！');
                }
                else {
                    $.post('service/CommonHandler.ashx?action=ModifyPassword', {
                        USERNAME: user_name,
                        PASSWORD: user_password_old,
                        PASSWORD_NEW: user_password_new
                    }, function (data) {
                        if (data == "1") {
                            alert('密码修改成功，请重新登录！');
                            window.location.href = 'login.aspx';
                        } else {
                            alert(data);
                        }
                    }, 'text');
                }
            }
        });
    </script>
</body>
</html>
