window.onload = function() {
    (function() {
        var movie = document.getElementById('movie');
        var playerBox = getClass('player-box')[0];
        var playcontrol = document.getElementById('play-control');
        var progressBox = document.getElementById('progress-box');
        var progress = document.getElementById('progress');
        var fullScreen = getClass('fullscreen')[0];
        // 播放暂停切换
        playerBox.addEventListener('click', function(e) {
            if (e.target.id != 'progress-box' && e.target.id != 'progress') {
                play();
            }
        }, false);
        // 进度条控制
        playerBox.addEventListener('mouseover', function() {
            addClass(progressBox, 'active');
        }, false);
        playerBox.addEventListener('mouseout', function() {
            removeClass(progressBox, 'active');
        }, false);
        movie.addEventListener('timeupdate', function() {
            var duration = movie.duration;
            var currTime = movie.currentTime;
            var pre = currTime / duration * 100 + '%';
            progress.style.width = pre;
            if (duration === currTime) {
                movie.currentTime = 0;
                removeClass(playcontrol, 'hide');
            }
        }, false);
        // 进度条跳转
        progressBox.addEventListener('click', function(e) {
            console.log(e.offsetX);
            movie.currentTime = (e.offsetX / this.offsetWidth) * movie.duration;
        }, false);
        // 全屏
        fullScreen.addEventListener('click', function() {
            if (movie.requestFullscreen) {
                movie.requestFullscreen();
            } else if (movie.mozRequestFullScreen) {
                movie.mozRequestFullScreen();
            } else if (movie.webkitRequestFullScreen) {
                movie.webkitRequestFullScreen();
            }
        }, false);
        // 播放暂停切换
        function play() {
            if (movie.paused || movie.ended) {
                if (movie.ended) {
                    movie.currentTime = 0;
                }
                movie.play();
            } else {
                movie.pause();
            }
            toggleClassName(playcontrol, 'hide');
        }
    }());
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
                speed = speed > 0
                    ? Math.ceil(speed)
                    : Math.floor(speed);
                document.documentElement.scrollTop = document.body.scrollTop = nowTop + speed;
                if (nowTop == target) {
                    clearInterval(timer);
                }
            }, 30);
        }
    }());
    // 切换显示作品列表
    (function() {
        var production = getClass('production');
        var productionList = getClass('production-list');
        var close = getClass('close');
        for (var i = 0; i < production.length; i++) {
            (function(i) {
                production[i].addEventListener('click', function() {
                    removeClass(productionList[i], 'hide');
                    productionList[i].style.top = (getInner().height - productionList[i].offsetHeight) / 2 + 'px';
                }, false);
                close[i].addEventListener('click', function() {
                    addClass(productionList[i], 'hide');
                }, false);
            })(i);
        }
    }());
}

// 常用的一些方法
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
        ele.className = ele.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
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
