<template>
	<div class="height">
		<dv-border-box-11 title="最新数据排名">
			<div class="title">
				<div>排名</div>
				<div>城市</div>
				<div>累计注册</div>
				<div>昨日日活</div>
			</div>
			<div
				id="box"
				@mouseenter="mouseenterEvent()"
				@mouseleave="mouseleaveEvent(scrollTime)"
			>
				<ul id="boxUl">
					<li v-for="(item, index) in tabData" :key="item + index">
						<div class="listbox">
							<div>{{ item.rank }}</div>
							<div>{{ item.province }}</div>
							<div>{{ item.addUp }}</div>
							<div>{{ item.dayActive }}</div>
						</div>
					</li>
				</ul>
				<ul id="boxUl2"></ul>
			</div>
		</dv-border-box-11>
	</div>
</template>

<script>
export default {
	data() {
		return {
			timer: null,
			scrollTime: 20,
		};
	},
	props: ["tabData"],
	mounted() {
		// 开启滚动
		console.log("列表", this.tabData);
		this.scroll(this.scrollTime);
	},
	methods: {
		scroll(t) {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			let ul = document.getElementById("boxUl");
			let ul2 = document.getElementById("boxUl2");
			let box = document.getElementById("box");
			// 初始值
			box.scrollTop = 0;
			// 赋值给空ul
			ul2.innerHTML = ul.innerHTML;
			this.timer = setInterval(this.rollStart, t);
		},
		setboxUi() {
			let ul = document.getElementById("boxUl");
			let ul2 = document.getElementById("boxUl2");
			ul2.innerHTML = ul.innerHTML;
		},
		rollStart() {
			let ul = document.getElementById("boxUl");
			let box = document.getElementById("box");
			if (box.scrollTop >= ul.scrollHeight) {
				box.scrollTop = 0;
			} else {
				box.scrollTop++;
			}
		},
		// 鼠标移入关闭定时器
		mouseenterEvent() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		// 鼠标移出重新调用定时器
		mouseleaveEvent(t) {
			if (!this.timer) {
				this.timer = setInterval(this.rollStart, t);
			}
		},
	},
	destroyed() {
		// 页面销毁清除定时器
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
};
</script>
 
<style lang = "scss" scoped>
.height {
	position: relative;
}
.title {
	position: absolute;
	top: 55px;
	height: 55px;
	padding: 0 20px 0 40px;
	div {
		float: left;
		width: 200px;
		line-height: 55px;
	}
	div:nth-of-type(2),
	div:nth-of-type(3) {
		width: 180px;
	}
}
#box {
	width: 820px;
	height: 230px;
	//溢出隐藏
	overflow: hidden;
	opacity: 0.85;
	border-radius: 20px;
	position: absolute;
	left: 20px;
	top: 100px;

	&:hover {
		// 实现Y轴可滚动
		overflow-y: scroll;
	}

	&::-webkit-scrollbar {
		width: 0px;
	}

	ul {
		width: 826px;
		box-sizing: border-box;

		li {
			height: 40px;
			padding: 0 20px;
			&:hover {
				cursor: pointer;
				background: rgba(117, 247, 247, 0.5) !important;
				font-size: 20px;
			}

			&:nth-child(even) {
				background: rgba(5, 19, 82, 0.4);
			}

			.listbox {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20px;
				box-sizing: border-box;
				height: 40px;
				div {
					flex: 1;
					height: 40px;
					width: 200px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					overflow: hidden;
				}
			}
		}
	}
}
</style>