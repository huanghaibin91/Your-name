$(document).ready(function () {
    var config = {
        authDomain: "danmaku-yourname.wilddog.com",
        syncURL: "https://danmaku-yourname.wilddogio.com/"
    };
    wilddog.initializeApp(config);
    var ref = wilddog.sync().ref();
    var arr = [];

    $('.danmaku-send').click(function () {
        var text = $('.input-text').val();
        ref.child('message').push(text);
        $('.input-text').val('');
    });

    $('.danmaku-clear').click(function () {
        $('.danmaku-box').toggle();
    });

    $('.input-text').keypress(function (event) {
        if (event.keyCode == 13) {
            $('.danmaku-send').trigger('click');
        }
    });

    ref.child('message').on('child_added', function (snapshot) {
        var text = snapshot.val();
        arr.push(text);
        var textObj = $('<div class=\"danmaku-message\"></div>');
        textObj.text(text);
        $('.danmaku-box').append(textObj);
        danmakuMove(textObj);
    });

    var topMin = 50;
    var topMax = topMin + $('.player-box').height() - 100;
    var textTop = topMin;
    var danmakuMove = function (obj) {
        var textLeft = $('.player-box').width() - obj.width();
        textTop = textTop + 50;
        if (textTop > topMax) {
            textTop = topMin;
        }
        obj.css({
            left: textLeft,
            top: textTop,
            color: getReandomColor()
        });
        var time = 20000 + 10000 * Math.random();
        obj.animate({
            left: '-' + obj.width() + 'px'
        }, time, function () {
            obj.remove();
        });
    };

    var getReandomColor = function () {
        return '#' + (function (num) {
            return new Array(7 - num.length).join("0") + num
        })((Math.random() * 0x1000000 << 0).toString(16))
    };

    // 定时循环调用自身，产生新的弹幕
    var getAndRun = function () {
        if (arr.length > 0) {
            var n = Math.floor(Math.random() * arr.length + 1) - 1;
            var textObj = $('<div class=\"danmaku-message\">' + arr[n] + '</div>');
            $(".danmaku-box").append(textObj);
            danmakuMove(textObj);
        }
        setTimeout(getAndRun, 3000);
    };
    jQuery.fx.interval = 50;
    getAndRun();
});