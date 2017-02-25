window.onload = function() {
    var movie = document.getElementById('movie');
    var playerBox = document.querySelector('.player-box');
    var progressBox = document.querySelector('#progress-box');
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
    var movie =document.getElementById('movie');
    var progressBox = document.querySelector('.progress-box');
    var progress = document.querySelector('.progress');
    var percent = movie.currentTime / movie.duration;
    progress.style.width = percent * (progressBox.offsetWidth) + "px";
}
