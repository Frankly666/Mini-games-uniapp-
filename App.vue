<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useGameInfoStore } from './stores/gameInfo'; // 根据你的路径调整

// 获取全局状态
const gameInfo = useGameInfoStore();

onLaunch(() => {

});

onShow(() => {
	if(gameInfo.bgm && gameInfo.bgmIsOpen) {
		gameInfo.bgm.play()
	}
});

onHide(() => {
  console.log('App Hide');
  // 应用进入后台时，停止音乐播放
  if (gameInfo.bgm) {
    gameInfo.bgm.pause();
		// gameInfo.bgmIsOpen = false;
  }
});
</script>

<style>
/* 每个页面公共css */
</style>