<template>
	<div class="height">
		<dv-border-box-10>
			<titleEchart :title="title"></titleEchart>
			<div :id="id" style="width: 100%; height: 100%"></div>
		</dv-border-box-10>
	</div>
</template>

<script>
import titleEchart from "@/components/title/titleEchart.vue";
export default {
	name: "MidBar",
	props: {
		title: {
			type: String,
			default: "累计注册用户",
		},
		id: {
			type: String,
			default: "oneline",
		},
		lineData: {
			type: Object,
			default: () => {},
		},
	},
	components: {
		titleEchart,
	},
	data() {
		return {
			option: null,
			chart: null,
			// 平均值数组
			average: [],
			color: ["#75f7f7", "#e3b337", "#FF752D", "#D2B48C", "#7891D9"],
		};
	},
	mounted() {
		this.initChart();
		// this.updateChart();
		console.log("传入数据", this.lineData);
	},
	methods: {
		initChart() {
			let option = {
				grid: {
					top: "20%",
					left: "5%",
					right: "10%",
					bottom: "10%",
					containLabel: true,
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow",
					},
					position: function (point) {
						return [point[0], point[1]];
					},
					confine: false,
					formatter: "{c}",
				},
				xAxis: {
					type: "category",
					data: this.lineData.xLabel,
					axisTick: {
						show: false,
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "rgb(41,188,245)",
						},
					},
				},
				yAxis: {
					type: "value",
					splitLine: {
						show: false,
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: "#fff",
							padding: 5,
						},
					},
				},
				series: [
					{
						data: this.lineData.dataValue,
						type: "bar",
						showBackground: true,
						backgroundStyle: {
							color: "rgba(180, 180, 180, 0.2)",
						},
						barWidth: 12,
						itemStyle: {
							borderRadius: [24, 24, 0, 0],
							color: (params) => {
								console.log();
								return this.color[params.dataIndex % 5];
							},
						},
					},
				],
			};
			// this.option = {
			// 	tooltip: {
			// 		trigger: "axis",
			// 		axisPointer: {
			// 			type: "shadow",
			// 		},
			// 		position: function (point) {
			// 			return [point[0], point[1]];
			// 		},
			// 		confine: false,
			// 		formatter: "{b}:{c}",
			// 	},
			// 	xAxis: [
			// 		{
			// 			type: "category",
			// 			boundaryGap: false,
			// 			axisLine: {
			// 				//坐标轴轴线相关设置。数学上的x轴
			// 				show: true,
			// 				lineStyle: {
			// 					color: "rgb(41,188,245)",
			// 				},
			// 			},
			// 			axisLabel: {
			// 				//坐标轴刻度标签的相关设置
			// 				// interval: 0,
			// 				textStyle: {
			// 					color: "#78bdf5",
			// 					// color:"#fff",
			// 					padding: 5,
			// 					fontSize: 12,
			// 				},
			// 				formatter: function (data) {
			// 					return data;
			// 				},
			// 			},
			// 			splitLine: {
			// 				show: false,
			// 				lineStyle: {
			// 					color: "#233653",
			// 				},
			// 			},
			// 			axisTick: {
			// 				show: false,
			// 			},
			// 			data: this.lineData.xLabel,
			// 		},
			// 	],
			// 	yAxis: [
			// 		{
			// 			min: "dataMin",
			// 			type: "value",
			// 			splitLine: {
			// 				show: false,
			// 			},
			// 			axisLine: {
			// 				show: false,
			// 				lineStyle: {
			// 					color: "#233653",
			// 				},
			// 			},
			// 			axisLabel: {
			// 				show: true,
			// 				textStyle: {
			// 					// color: '#78bdf5',
			// 					color: "#fff",
			// 					padding: 5,
			// 				},
			// 			},
			// 			axisTick: {
			// 				show: false,
			// 			},
			// 		},
			// 	],
			// 	series: [
			// 		{
			// 			data: this.lineData.dataValue,
			// 			type: "bar",
			// 			showBackground: true,
			// 			backgroundStyle: {
			// 				color: "rgba(180, 180, 180, 0.2)",
			// 			},
			// 			name: "数量",
			// 			type: "bar",

			// 			barWidth: 12,
			// 			data: this.lineData.dataValue,
			// 			itemStyle: {
			// 				color: (params) => {
			// 					return new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
			// 						{
			// 							offset: 0,
			// 							color: "rgba(54,69,129,1)",
			// 						},
			// 						{
			// 							offset: 0.8,
			// 							color: this.color[params.dataIndex],
			// 						},
			// 						{
			// 							offset: 1,
			// 							color: "rgba(255,255,255,0.8)",
			// 						},
			// 					]);
			// 				},
			// 				shadowColor: "rgba(0, 0, 0, 0.5)",
			// 				shadowBlur: 10,
			// 				borderRadious: [24, 24, 0, 0],
			// 			},
			// 			emphasis: {
			// 				disabled: true,
			// 			},
			// 		},
			// 	],
			// };
			this.chart = this.$echarts.init(document.getElementById(this.id));
			this.chart.setOption(option);
		},
		updateChart() {
			// 处理平均值
			let num = 0;
			let len = this.lineData.dataValue.length;
			for (let i = 0; i < len; i++) {
				num += this.lineData.dataValue[i];
			}
			for (let i = 0; i < len; i++) {
				this.average.push(num / len);
			}
			const dataOption = {
				xAxis: [
					{
						data: [...this.lineData.xLabel],
					},
				],
				series: [
					{
						data: [...this.lineData.dataValue],
					},
				],
			};
			this.chart.setOption(dataOption);
		},
	},
	// 销毁操作
	beforeDestroy() {
		this.chart.dispose();
		this.chart = null;
	},
};
</script>
 
<style lang = "scss" scoped>
</style>