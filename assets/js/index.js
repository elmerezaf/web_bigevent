$(function () {
    getUserInfo()
    var layer = layui.layer
    // 点击退出确认退出
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something点击确定后执行下面
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'
            // 点击确定后关闭询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 由于上面my开头的，并非api开头接头所以一般my的都是有权限的接口，就需要下面
        // 提交header请求头
        headers: {
            //获取localstorage的认证，如果没有token值就执行后面的空字符串
            Authorization: localStorage.getItem('token') || ''
        },
        // 下面有两个回调函数，分别是success和complete
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        // 不论成功失败最终都会调用这个回调函数,这里注释掉，因为我在baseAPI.js调用了该函数
        /*         complete: function (res) {
                    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                        localStorage.removeItem('token')
                        location.href = '/login.html'
                    }
                } */
    })

}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#zhutou').html('&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-icon').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-icon').html(first).show()
    }
}