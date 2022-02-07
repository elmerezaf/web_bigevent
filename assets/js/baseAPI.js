// 为了解决url前缀重复过多的问题，因此使用jQuery自带的ajaxPrefilter函数。
//当然并非必须要使用，看项目而定
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url


    // 统一为有权限的接口设置header请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂在complete回调函数
    // options.complete = function (res) {
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         localStorage.removeItem('token')
    //         location.href = '/login.html'
    //     }
    // }
})