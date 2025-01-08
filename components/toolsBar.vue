<template>
	<view class="toolsBar">
		<view class="controll" @click="toggleFold">
			<image src="../static/toolsBar/arrowRight.png" mode="widthFix" class="arrow" v-if="needFold"></image>
			<image src="../static/toolsBar/arrowLeft.png" mode="widthFix" class="arrow" v-else></image>
		</view>
		
		<view class="toolsWrap" :style="`width:${!needFold ? '0' : '80vw' }` ">
			<view 
				class="tool"
				v-for="(item,index) in imgList" :key="index" 
				:style="`background: url('../static/toolsBar/${imgList[index]}.png') no-repeat center center / contain;`"
				@click="() => {props.handleShow(index, true)}"
				>
				<span v-show="needFold">{{imgMap[index]}}</span>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const imgList = ['setting','warehouse', 'activity', 'announcement', 'rule'];
	const imgMap = ['设置', '仓库', '活动', '公告', '玩法'];
	const needFold = ref(true)
	const props = defineProps(['handleShow']);
	
	function toggleFold() {
		needFold.value = !needFold.value
	}
</script>

<style lang="less">
	.toolsBar {
		z-index: 99;
		position: fixed;
		width: 95vw;
		bottom: 10vw;
		right: 2vw;
		display: flex;
		flex-direction: row-reverse;
		
		.controll {
			position: relative;
			width: 15vw;
			background: url('../static/toolsBar/btn_Blue.png') no-repeat center center / contain;
			
			.arrow {
				position: absolute;
				top: 2vw;
				left: 3vw;
				width: 8vw;
				height: 8vw;
				
			}
		}
		
		.toolsWrap {
			width: 80vw;
			display: flex;
			justify-content: space-between;
			flex-direction: row-reverse;
			transition: width 0.3s ease-in-out;
			
			.tool {
				position: relative;
				width: 13vw;
				height: 13vw;
				
				span {
					position: absolute;
					top: 14vw;
					left: 1vw;
					padding: 0 1vw;
					border-radius: 2vw;
					font-weight: bold;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.5);
					transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
				}
			}
		}
		
	}

</style>