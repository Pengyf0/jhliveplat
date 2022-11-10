<template>
	<div class="header">
		<div class="bgHeader"></div>
		<div class="text">
			<div class="headerLeft">
				<div class="dataTime">{{ newTime }}</div>
				<div class="yearTime">
					<div class="yearTimeTop">{{ newWeek }}</div>
					<div class="yearTimeBottom">{{ newDay }}</div>
				</div>
			</div>
			<div class="headerCenter">{{ text }}</div>
			<div class="headerRight">
				<span class="time">
					0{{ min }} : {{ count > 9 ? count : "0" + count }}
				</span>
				<span>后更新</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			newTime: "", //时间
			newWeek: "", //星期
			newDay: "", //日期
			realTime: null, //实时时间
		};
	},
	props: ["text"],
	computed: {
		//意思是将vuex中的city数据映射到组件的computed属性里
		...mapState(["count", "min"]),
	},
	created() {
		this.$store.commit("hdCount");
	},
	mounted() {
		// 实时变化时间
		this.realTime = setInterval(() => {
			this.getTime();
			this.$store.commit("changeCount");
			if (this.count == 0 && this.min == 0) this.$store.commit("hdCount");
		}, 1000);
	},
	methods: {
		// 当前时间
		getTime() {
			let t = new Date();
			let y = t.getFullYear();
			let mm = t.getMonth() + 1;
			let m = mm < 10 ? "0" + mm : mm;
			let d = t.getDate() < 10 ? "0" + t.getDate() : t.getDate();
			let h = t.getHours() < 10 ? "0" + t.getHours() : t.getHours();
			let mi = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes();
			let s = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds();
			// 时分秒
			this.newTime = h + ":" + mi + ":" + s;
			// 年月日
			this.newDay = y + "-" + m + "-" + d;
			// 星期几
			let weekDays = [
				"星期天",
				"星期一",
				"星期二",
				"星期三",
				"星期四",
				"星期五",
				"星期六",
			];
			let week = t.getDay();
			this.newWeek = weekDays[week];
		},
	},
	destroyed() {
		// 清除定时器
		if (this.realTime) clearInterval(this.realTime);
	},
};
</script>
 
<style lang = "scss" scoped>
.header {
	height: 80px;
	min-width: 1366px;
	box-sizing: border-box;
	color: #fff;
	padding: 20px;
	@font-face {
		font-family: "DS-Digib";
		src: url("../../assets/json/DS-DIGIB.ttf");
	}
	.bgHeader {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 80px;
		background: url("@/assets/images/title.png") no-repeat;
		background-size: 100% 100%;
	}

	.text {
		font-size: 18px;
		z-index: 5;
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: space-between;

		.headerLeft {
			width: 128px;
			height: 37px;
			// font-size: 32px;
			display: flex;
			justify-content: flex-start;
			// font-family: FZLTXHJW--GB1-0, FZLTXHJW--GB1;
			// font-weight: normal;
			line-height: 37px;

			.yearTime {
				font-size: 12px;
				line-height: 18px;
				margin-left: 10px;

				.yearTimeBottom {
					width: 78px;
				}
			}
		}

		.headerCenter {
			font-size: 34px;
			text-shadow: 2px 2px 4px #fff;
		}

		.headerRight {
			height: 37px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 125px;

			.time {
				color: #2db5fe;
				font-size: 24px;
				font-weight: 700;
				font-family: "DS-Digib";
				display: inline-block;
				width: 68px;
			}
		}
	}
}
</style>