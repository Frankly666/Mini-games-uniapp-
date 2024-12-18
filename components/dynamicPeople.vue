<template>
	<view class="peopleWrap">
		<view class="flowers">
			<view class="flower f1"></view>
			<view class="flower f2"></view>
			<view class="flower f3"></view>
			<view class="flower f4"></view>
		</view>
		

		
		<view class="talentCenter">
			<view class="p1 person"></view>
			<!-- <view class="p2 person"></view> -->
			<!-- <view class="p3 person"></view> -->
			<!-- <view class="p4 person"></view> -->
			<!-- <view class="p5 person"></view> -->
			<!-- <view class="p6 person"></view> -->
		</view>
		
		<view class="ground">
			<view class="person p7"></view>
			<view class="person p8"></view>
			<view class="person p9"></view>
			<view class="person p10"></view>
		</view>
		
		<view class="mineArea">
			<view class="mine m1"></view>
			<view class="mine m2"></view>
			<!-- <view class="mine m3"></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"dynamicPeople",
		data() {
			return {

			};
		},
		 mounted() {
		  },
		methods: {
			
		}
	}
</script>

<style lang="less">
	.peopleWrap {
		position: absolute;
		width: 100%;
		height: 100%;
		
		.person {
			position: absolute;
			width: 15vw;
			height: 15vw;
			background: no-repeat center center / contain;
		}
		
		.mine {
			position: absolute;
			width: 45vw;
			height: 45vw;
			background: no-repeat center center / contain;
		}

		.flower {
			position: absolute;
			width: 30vw;
			height: 30vw;
			background: no-repeat center center / contain;
		}
		
		
		.flowers {
			position: absolute;
			top: 200vw;
			left: 100vw;
			
			.f1 {
				top: 59vw;
				left: -10vw;
				background-image: url('../static/characters/Flowers_Red.gif')
			}
			
			.f2 {
				top: 45vw;
				left: 70vw;
				background-image: url('../static/characters/Flowers_White.gif')
			}
			
			.f3 {
				top: 40vw;
				left: 78vw;
				background-image: url('../static/characters/Flowers_Red.gif')
			}
			
			.f4 {
				background-image: url('../static/characters/Flowers_White.gif')
			}
		}
		
		.talentCenter {
			position: absolute;
			top: 130vw;
			left: 140vw;
		
			
			.p1 {
				background-image: url('../static/characters/待机.gif')
			}
			
			.p2 {
				top: 15vw;
				background-image: url('../static/characters/2.gif')
			}
			
			.p3 {
				top: 15vw;
				left: 15vw;
				background-image: url('../static/characters/3.gif')
			}
			
			.p4 {
				top: 20vw;
				left: 25vw;
				background-image: url('../static/characters/4.gif')
			}
			
			.p5 {
				top: 10vw;
				left: 30vw;
				background-image: url('../static/characters/5.gif')
			}
			
			.p6 {
				left: 30vw;
				background-image: url('../static/characters/6.gif')
			}
		}
		
		.ground {
			position: absolute;
			top: 100vw;
			
			.p7 {
				left: 55vw;
				top: 50vw;
				background-image: url('../static/characters/耕地.gif')
			}
			
			.p8 {
				left: 30vw;
				background-image: url('../static/characters/铲土.gif')
			}
			
			.p9 {
				width: 30vw;
				height: 30vw;
				top: 35vw;
				left: 20vw;
				background-image: url('../static/characters/spr_dig.gif')
			}
			
			.p10 {
				width: 35vw;
				height: 35vw;
				top: 95vw;
				left: 30vw;
				background-image: url('../static/characters/spr_carry.gif')
			}
		}
		
		.mineArea {
			position: absolute;
			left: 180vw;
			top: 70vw;
			 
			
			.m1 {
				top: -36vw;
				left: 44vw;
				background-image: url('../static/characters/blacksmith.gif')
			}
			
			.m2 {
				top: -60vw;
				left: 24vw;
				animation: moveUpDown 6s infinite linear;
			}
			
		}
		
		@keyframes moveUpDown {
		  0%, 100% {
		    top: -60vw; /* 初始位置 */
		    background-image: url('../static/characters/miner1up.gif');
		  }
			49% {
				 background-image: url('../static/characters/miner1up.gif');
			}
		  50% {
		    top: -28vw; /* 向下移动到顶部 */
				left: 27vw;
		    background-image: url('../static/characters/miner1upopp.gif'); /* 改变图片 */
		  }
			99% {
				background-image: url('../static/characters/miner1upopp.gif');
			}		}
	}
</style>