window.onload = function() {
    var movie = document.getElementById('movie');
    var playerBox = document.querySelector('.player-box');
    var progressBox = document.querySelector('#progress-box');
    // 元素居中
    var productionList = getClass('production-list');
    var close = getClass('close');
    // for (var i = 0; i < productionList.length; i++) {
    //     productionList[i].style.top = (getInner().height - productionList[i].offsetHeight) / 2 + 'px';
    // }
    // 切换显示作品列表
    var production = getClass('production');
    for (var i = 0; i < production.length; i++) {
        (function(i) {
            production[i].onclick = function() {
                // for (var j = 0; j < productionList.length; j++) {
                //     addClass(productionList[i], 'hide');
                // }
                removeClass(productionList[i], 'hide');
                // document.body.style.overflow = 'hidden';
                productionList[i].style.top = (getInner().height - productionList[i].offsetHeight) / 2 + 'px';
            }
            close[i].onclick = function() {
                addClass(productionList[i], 'hide');
            }
        })(i);
    }

    playerBox.addEventListener('click', function() {
        play();
    }, false);
    playerBox.addEventListener('mouseover', function() {
        progressBox.className = 'active';
    }, false);
    playerBox.addEventListener('mouseout', function() {
        progressBox.className = '';
    }, false);
}
// 播放暂停切换
function play() {
    var playcontrol = document.getElementById('play-control');
    if (movie.paused || movie.ended) {
        if (movie.ended) {
            movie.currentTime = 0;
        }
        movie.play();
        playcontrol.className = 'hidden';
    } else {
        movie.pause();
        playcontrol.className = 'show';
    }
}

function getProgress() {
    var movie = document.getElementById('movie');
    var progressBox = document.querySelector('.progress-box');
    var progress = document.querySelector('.progress');
    var percent = movie.currentTime / movie.duration;
    progress.style.width = percent * (progressBox.offsetWidth) + "px";
}

// 立即函数
(function() {
    // 点击页面滚动到指定位置
    var nav = getClass('nav')[0];
    nav.addEventListener('click', function(e) {
        var target = e.target;
        if (target.nodeName == 'LI') {
            switch (target.id) {
                case 'home-page':
                    scrollMove(0);
                    break;
                case 'film-synopsis':
                    scrollMove(610);
                    break;
                case 'character-introduction':
                    scrollMove(1250);
                    break;
                case 'production-personnel':
                    scrollMove(3100);
                    break;
                default:
                    break;
            }
        }
    }, false);
    function scrollMove(target) {
        var timer = setInterval(function() {
            var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = (target - nowTop) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            document.documentElement.scrollTop = document.body.scrollTop = nowTop + speed;
            if (nowTop == target) {
                clearInterval(timer);
            }
        }, 30);
    }
})();


// 获取类
function getClass(cls, id) {
    var node = null;
    if (arguments.length === 2) {
        node = document.getElementById(id);
    } else {
        node = document;
    }
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(cls);
    } else {
        var result = [];
        var all = node.getElementsByTagName('*');
        for (var i = 0; i < all.length; i++) {
            if (all[i].className === cls) {
                result.push(all[i]);
            }
        }
        return result;
    }
}
// 判断元素是否包含类名
function hasClass(ele, cls) {
    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
}
// 添加类名
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}
// 移除类名
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        ele.className = ele.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
    }
}
// 切换类名
function toggleClassName(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    } else {
        ele.className = replace(new RegExp('(\\s|^)' + cls + '\\s|$'), ' ');
    }
}
// 获取窗口宽高
function getInner() {
    if (typeof window.innerWidth != 'undefined') {
        return {width: window.innerWidth, height: window.innerHeight}
    } else {
        return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
    }
}
