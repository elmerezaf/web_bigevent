$(function () {
    // 点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('#dcpwd').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听表单注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // 发起ajax的post请求
        var data = { username: $('#form_reg[name=username]').val(), password: $('#form_reg[name=password]').val() }
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败!')
                }
                layer.msg('注册成功!')
                $('#link_login').click()
            })

    })

    // 监听表单登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 下面序列相当于把登录表单username=value&password=value
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 江邓路成功得到的token字符串保存到localsstorage中，之后访问自动携带

                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})