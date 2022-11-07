<template>
	<div class="height">
		<dv-border-box-10>
			<titleEchart title="本周积分情况占比" v-if="isJiFen"></titleEchart>
			<titleEchart title="日月活率" v-else></titleEchart>
			<div :id="id" style="width: 100%; height: 90%"></div>
		</dv-border-box-10>
	</div>
</template>

<script>
import titleEchart from "@/components/title/titleEchart.vue";
import { mapState } from "vuex";
export default {
	data() {
		return {
			option: null,
			chart: null,
			angle: 0, //角度，用来做简单的动画效果的
			timer: null, //定时器
		};
	},
	props: {
		pieData: {
			type: Object,
			default: () => {},
		},
		id: {
			type: String,
			default: "pie",
		},
	},
	components: {
		titleEchart,
	},
	computed: {
		...mapState(["isJiFen"]),
	},
	created() {},
	mounted() {
		this.initChart();
		console.log("pieData", this.pieData);
		// this.updateChart()
		// this.timerInter()
	},
	methods: {
		initChart() {
			this.option = {
				title: [
					{
						text: this.isJiFen ? "抵限订单" : "日活率",
						bottom: 0,
						left: this.isJiFen ? 80 : 87,
						textStyle: {
							color: "#fff",
						},
					},
					{
						text: this.isJiFen ? "用户数" : "月活率",
						bottom: 0,
						right: 87,
						textStyle: {
							color: "#fff",
						},
					},
				],
				series: [
					// {
					//     name: "ring5",
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         return {
					//             type: "arc",
					//             shape: {
					//                 cx: api.getWidth() / 2,
					//                 cy: api.getHeight() / 2,
					//                 r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
					//                 startAngle: ((0 + this.angle) * Math.PI) / 180,
					//                 endAngle: ((90 + this.angle) * Math.PI) / 180,
					//             },
					//             style: {
					//                 stroke: "#8383FA",
					//                 fill: "transparent",
					//                 lineWidth: 1.5,
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					// {
					//     name: "ring5", //紫点
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         let x0 = api.getWidth() / 2;
					//         let y0 = api.getHeight() / 2;
					//         let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
					//         let point = this.getCirlPoint(x0, y0, r, 90 + this.angle);
					//         return {
					//             type: "circle",
					//             shape: {
					//                 cx: point.x,
					//                 cy: point.y,
					//                 r: 4,
					//             },
					//             style: {
					//                 stroke: "#8450F9", //绿
					//                 fill: "#8450F9",
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					// {
					//     name: "ring5",
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         return {
					//             type: "arc",
					//             shape: {
					//                 cx: api.getWidth() / 2,
					//                 cy: api.getHeight() / 2,
					//                 r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
					//                 startAngle: ((180 + this.angle) * Math.PI) / 180,
					//                 endAngle: ((270 + this.angle) * Math.PI) / 180,
					//             },
					//             style: {
					//                 stroke: "#4386FA",
					//                 fill: "transparent",
					//                 lineWidth: 1.5,
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					// {
					//     name: "ring5", // 蓝色
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         let x0 = api.getWidth() / 2;
					//         let y0 = api.getHeight() / 2;
					//         let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
					//         let point = this.getCirlPoint(x0, y0, r, 180 + this.angle);
					//         return {
					//             type: "circle",
					//             shape: {
					//                 cx: point.x,
					//                 cy: point.y,
					//                 r: 4,
					//             },
					//             style: {
					//                 stroke: "#4386FA", //绿
					//                 fill: "#4386FA",
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					// {
					//     name: "ring5",
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         return {
					//             type: "arc",
					//             shape: {
					//                 cx: api.getWidth() / 2,
					//                 cy: api.getHeight() / 2,
					//                 r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
					//                 startAngle: ((270 + -this.angle) * Math.PI) / 180,
					//                 endAngle: ((40 + -this.angle) * Math.PI) / 180,
					//             },
					//             style: {
					//                 stroke: "#0CD3DB",
					//                 fill: "transparent",
					//                 lineWidth: 1.5,
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					// 橘色
					// {
					//     name: "ring5",
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         return {
					//             type: "arc",
					//             shape: {
					//                 cx: api.getWidth() / 2,
					//                 cy: api.getHeight() / 2,
					//                 r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
					//                 startAngle: ((90 + -this.angle) * Math.PI) / 180,
					//                 endAngle: ((220 + -this.angle) * Math.PI) / 180,
					//             },
					//             style: {
					//                 stroke: "#FF8E89",
					//                 fill: "transparent",
					//                 lineWidth: 1.5,
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					// {
					//     name: "ring5",
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         let x0 = api.getWidth() / 2;
					//         let y0 = api.getHeight() / 2;
					//         let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
					//         let point = this.getCirlPoint(x0, y0, r, 90 + -this.angle);
					//         return {
					//             type: "circle",
					//             shape: {
					//                 cx: point.x,
					//                 cy: point.y,
					//                 r: 4,
					//             },
					//             style: {
					//                 stroke: "#FF8E89", //粉
					//                 fill: "#FF8E89",
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					// {
					//     name: "ring5", //绿点
					//     type: "custom",
					//     coordinateSystem: "none",
					//     renderItem: (params, api) => {
					//         let x0 = api.getWidth() / 2;
					//         let y0 = api.getHeight() / 2;
					//         let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
					//         let point = this.getCirlPoint(x0, y0, r, 270 + -this.angle);
					//         return {
					//             type: "circle",
					//             shape: {
					//                 cx: point.x,
					//                 cy: point.y,
					//                 r: 4,
					//             },
					//             style: {
					//                 stroke: "#0CD3DB", //绿
					//                 fill: "#0CD3DB",
					//             },
					//             silent: true,
					//         };
					//     },
					//     data: [0],
					// },
					{
						name: "抵扣订单",
						type: "pie",
						radius: ["52%", "40%"],
						center: ["25%", "50%"],
						silent: true,
						clockwise: true,
						startAngle: 90,
						z: 2,
						label: {
							position: "center",
							formatter: (params) => {
								return params.value + "%";
							},
							textStyle: {
								fontSize: "18",
								color: "#fff",
							},
						},
						data: [
							{
								value: this.pieData.orderValue,
								name: "",
								itemStyle: {
									color: {
										// 完成的圆环的颜色
										colorStops: [
											{
												offset: 0,
												color: "#A098FC", // 0% 处的颜色
											},
											{
												offset: 0.3,
												color: "#4386FA", // 0% 处的颜色
											},
											{
												offset: 0.6,
												color: "#4FADFD", // 0% 处的颜色
											},
											{
												offset: 0.8,
												color: "#0CD3DB", // 100% 处的颜色
											},
											{
												offset: 1,
												color: "#646CF9", // 100% 处的颜色
											},
										],
									},
								},
							},
							{
								value: 100 - this.pieData.orderValue,
								name: "",
								label: {
									show: false,
								},
								itemStyle: {
									color: "#173164",
								},
							},
						],
					},
					{
						name: "用户数",
						type: "pie",
						radius: ["52%", "40%"],
						center: ["75%", "50%"],
						silent: true,
						clockwise: true,
						startAngle: 270,
						z: 2,
						label: {
							position: "center",
							formatter: (params) => {
								return params.value + "%";
							},
							textStyle: {
								fontSize: "18",
								color: "#fff",
							},
						},
						data: [
							{
								value: this.pieData.userValue,
								name: "",
								itemStyle: {
									color: {
										// 完成的圆环的颜色
										colorStops: [
											{
												offset: 0,
												color: "#A098FC", // 0% 处的颜色
											},
											{
												offset: 0.3,
												color: "#4386FA", // 0% 处的颜色
											},
											{
												offset: 0.6,
												color: "#4FADFD", // 0% 处的颜色
											},
											{
												offset: 0.8,
												color: "#0CD3DB", // 100% 处的颜色
											},
											{
												offset: 1,
												color: "#646CF9", // 100% 处的颜色
											},
										],
									},
								},
							},
							{
								value: 100 - this.pieData.userValue,
								name: "",
								// label: {
								//     show: false,
								// },
								itemStyle: {
									color: "#173164",
								},
							},
						],
					},
				],
			};
			// 初始化echart
			this.chart = this.$echarts.init(document.getElementById(this.id));
			this.chart.setOption(this.option, false);
		},
		updateChart() {
			const dataOption = {
				series: [
					{
						data: [
							{
								value: this.pieData.orderValue,
							},
							{
								value: 100 - this.pieData.orderValue,
							},
						],
					},
					{
						data: [
							{
								value: this.pieData.userValue,
							},
							{
								value: 100 - this.pieData.userValue,
							},
						],
					},
				],
			};
			this.chart.setOption(dataOption);
		},
		//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
		getCirlPoint(x0, y0, r, angle) {
			let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
			let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
			return {
				x: x1,
				y: y1,
			};
		},
		draw() {
			this.angle = this.angle + 3;
			// this.chart.setOption(this.option, true);
		},
		// timerInter() {
		//     this.timer = setInterval(() => {
		//         //用setInterval做动画感觉有问题
		//         this.draw();
		//     }, 100);
		// }
	},
	// 销毁操作
	beforeDestroy() {
		this.chart.dispose();
		this.chart = null;
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
	watch: {
		pieData: {
			handler() {
				this.initChart();
			},
			deep: true,
		},
		isJiFen: {
			handler: function () {
				this.initChart();
			},
		},
	},
};
</script>
 
<style lang = "scss" scoped>
</style> 