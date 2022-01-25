// 为了解决url前缀重复过多的问题，因此使用jQuery自带的ajaxPrefilter函数。
//当然并非必须要使用，看项目而定
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})