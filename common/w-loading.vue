<template>
  <view class="mask" :class= "mask == 'true' || mask == true ? 'mask-show' : ''" @click="Mclose" v-if="show" @touchmove.stop.prevent="preventTouchMove">
		<!-- 加载动画开始 -->    <!-- loading1~loading30挑选任意一个替换下方html 且替换对应css -->
    <view class="container loading6">
    	<view class="shape shape1"></view>
    	<view class="shape shape2"></view>
    	<view class="shape shape3"></view>
    	<view class="shape shape4"></view>
    </view>
		<!-- 加载动画结束 -->
  </view>
  <!-- 遮罩层-->
</template>

<script scoped="true">
export default {
  name: "w-loading",
	props:{
		text: String,
		mask: Boolean | String,
		click: Boolean | String,
	},
  data() {
    return {
			show: false
		};
  },
	methods:{
		preventTouchMove(){
			console.log('stop user scroll it!');
			return;
		},
		Mclose(){
			if(this.click == 'false' || this.click == false){
				this.show = false
			}
		},
		open(){
			this.show = true
    },
    close(){
      this.show = false
    }
	}
};
</script>

<style>
.mask {
  /* pointer-events: none; */
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
	flex-direction:column;
  justify-content: center;
  align-items: center;
	flex-wrap: wrap;
}
.mask.mask-show{
	background: rgba(7, 17, 27, .3);
}
.title{
	color: #fff;
	font-size: 28upx;
}





/* loading加载动画的css */
.container {
  width: 50px;
  height: 50px;
  position: relative;
}

.container.loading6 {
  -webkit-animation: rotation 1s infinite;
          animation: rotation 1s infinite;
}
.container.loading6 .shape {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}
.container .shape {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 1px;
}
.container .shape.shape1 {
  left: 0;
  background-color: #5C6BC0;
}
.container .shape.shape2 {
  right: 0;
  background-color: #8BC34A;
}
.container .shape.shape3 {
  bottom: 0;
  background-color: #FFB74D;
}
.container .shape.shape4 {
  bottom: 0;
  right: 0;
  background-color: #F44336;
}


.loading6 .shape1 {
  -webkit-animation: animation6shape1 1s linear 0s infinite normal;
          animation: animation6shape1 1s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape1 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
            transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
            transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
            transform: translate(18px, 0);
  }
}

@keyframes animation6shape1 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 18px);
            transform: translate(0, 18px);
  }
  50% {
    -webkit-transform: translate(18px, 18px);
            transform: translate(18px, 18px);
  }
  75% {
    -webkit-transform: translate(18px, 0);
            transform: translate(18px, 0);
  }
}
.loading6 .shape2 {
  -webkit-animation: animation6shape2 1s linear 0s infinite normal;
          animation: animation6shape2 1s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape2 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
            transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
            transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
            transform: translate(0, 18px);
  }
}

@keyframes animation6shape2 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(-18px, 0);
            transform: translate(-18px, 0);
  }
  50% {
    -webkit-transform: translate(-18px, 18px);
            transform: translate(-18px, 18px);
  }
  75% {
    -webkit-transform: translate(0, 18px);
            transform: translate(0, 18px);
  }
}
.loading6 .shape3 {
  -webkit-animation: animation6shape3 1s linear 0s infinite normal;
          animation: animation6shape3 1s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape3 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
            transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
            transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
            transform: translate(0, -18px);
  }
}

@keyframes animation6shape3 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(18px, 0);
            transform: translate(18px, 0);
  }
  50% {
    -webkit-transform: translate(18px, -18px);
            transform: translate(18px, -18px);
  }
  75% {
    -webkit-transform: translate(0, -18px);
            transform: translate(0, -18px);
  }
}
.loading6 .shape4 {
  -webkit-animation: animation6shape4 1s linear 0s infinite normal;
          animation: animation6shape4 1s linear 0s infinite normal;
}

@-webkit-keyframes animation6shape4 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
            transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
            transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
            transform: translate(-18px, 0);
  }
}

@keyframes animation6shape4 {
  0% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, -18px);
            transform: translate(0, -18px);
  }
  50% {
    -webkit-transform: translate(-18px, -18px);
            transform: translate(-18px, -18px);
  }
  75% {
    -webkit-transform: translate(-18px, 0);
            transform: translate(-18px, 0);
  }
}
</style>
