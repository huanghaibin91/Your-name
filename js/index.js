window.onload = function() {
    var movie = document.getElementById('movie');
    var playerBox = document.querySelector('.player-box');
    var progressBox = document.querySelector('#progress-box');
    // 元素居中
    var productionList = getClass('production-list');
    for (var i = 0; i < productionList.length; i++) {
        productionList[i].style.top = (getInner().height - productionList[i].offsetHeight) / 2 + 'px';
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
// 切换类名
function toggleClassName(ele, cls) {
    if (ele.className == cls) {
        ele.className = '';
    } else {
        ele.className = cls;
    }
}
function play() {
    var playcontrol = document.getElementById('play-control');
    if (movie.paused || movie.ended) {
        if (movie.ended) {
            movie.currentTime = 0;
        }
        movie.play();
        playcontrol.style.display = 'none';
    } else {
        movie.pause();
        playcontrol.style.display = 'block';
    }
}

function getProgress() {
    var movie = document.getElementById('movie');
    var progressBox = document.querySelector('.progress-box');
    var progress = document.querySelector('.progress');
    var percent = movie.currentTime / movie.duration;
    progress.style.width = percent * (progressBox.offsetWidth) + "px";
}
// 获取窗口宽高
function getInner() {
    if (typeof window.innerWidth != 'undefined') {
        return {width: window.innerWidth, height: window.innerHeight}
    } else {
        return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
    }
}


// 点击页面滚动到指定位置
// 550
var demo = document.getElementById('film-synopsis');
demo.onclick = function() {
    scrollMove(550);
}
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
