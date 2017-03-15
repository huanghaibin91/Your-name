* video元素
	* currentTime，返回当前播放位置，以秒表示
	* duration，返回媒体的总时长，以秒表示
	* paused，表示媒体暂停状态
	* play，媒体播放开始时发生
	* pause，媒体暂停时发生
	* loadeddata，在媒体可以在当前播放位置开始播放时发生
	* ended，在媒体播放完成停止时开始
	* ontimeupdata,当前播放位置改变时执行，使用时需要绑定addEventListener
	* requestFullscreen全屏
	* exitFullscreen退出全屏
* 背景简写设置：background:<color> <image> <position> <attachment> <repeat>；