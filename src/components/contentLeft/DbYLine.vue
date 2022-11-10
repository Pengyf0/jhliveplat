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
	data() {
		return {
			option: null,
			chart: null,
			colors: ["#75f7f7", "#e3b337"],
		};
	},
	props: {
		lineData: {
			type: Object,
			default: () => {},
		},
		title: {
			type: String,
			default: "积分用户数",
		},
		id: {
			type: String,
			default: "dbline",
		},
	},
	components: {
		titleEchart,
	},
	mounted() {
		// this.$nextTick(() => {
		this.initChart();
		this.updateChart();
		// })
	},
	methods: {
		initChart() {
			// 初始化echart
			this.chart = this.$echarts.init(document.getElementById(this.id), null, {
				renderer: "svg",
			});
			this.option = {
				color: this.colors,
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
					},
				},
				grid: {
					//整个图的左右上下间距
					left: "5%",
					right: "5%",
					top: "25%",
					bottom: "0%",
					containLabel: true,
				},
				legend: {
					itemHeight: 8,
					itemWidth: 8,
					right: "22",
					top: "20",
					textStyle: { color: "#fff" },
					// data: this.lineData.legendData
				},
				xAxis: [
					{
						type: "category",
						boundaryGap: false, //折线居中改为最左到最右
						axisLine: {
							show: false, //是否显示x轴
							// onZero: true,
							lineStyle: {
								//坐标轴文字和轴线的颜色
								color: "#fff",
							},
						},
						axisTick: {
							show: false, //是否显示刻度线
						},
						axisLabel: {
							//横坐标显示
							// fontWeight: 700, //文字样式
							interval: 50, // 只显示最大和最小坐标(比数组个数大)
							showMinLabel: true, // 显示最小刻度标签
							showMaxLabel: true, // 显示最大刻度标签
							// 单独设置标签样式formatter
							formatter: function (value, index) {
								let valueone = "";
								let valuetwo = "";
								if (index == 0) {
									// 横坐标第一段文字
									valueone = value;

									return `{a|${valueone}}`;
								} else {
									valuetwo = value;
									return `{b|${valuetwo}}`;
								}
							},
							rich: {
								a: {
									padding: [0, 0, 0, 50],
								},
								b: {
									padding: [0, 70, 0, 0],
								},
							},
						},
						// data: this.lineData.startData
					},
				],
				yAxis: [
					{
						type: "value",
						splitNumber: 4, //y轴只显示四个值
						position: "left",
						alignTicks: false,
						axisLine: {
							show: false, //是否显示轴线
							lineStyle: {
								color: this.colors[0],
							},
						},
						axisLabel: {
							formatter: "{value} ",
						},
						axisPointer: {
							axis: "auto",
							// snap: true, //自动吸附
							status: "hide",
							label: {
								show: true,
								formatter: function (params) {
									let a = "";
									let p = Number(params.value).toFixed();
									if (p >= 0) {
										a = p;
										if (p > 999) {
											let parts = p.toString().split(".");
											parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
											a = parts.join(".");
										}
									}
									return a;
								},
								backgroundColor: this.colors[0],
							},
						},
					},
					{
						type: "value",
						position: "right",
						alignTicks: true,
						axisLine: {
							show: false, //是否显示轴线
							lineStyle: {
								color: this.colors[1],
							},
						},
						axisLabel: {
							formatter: "{value} ",
						},
						axisPointer: {
							axis: "auto",
							// snap: true, //自动吸附
							status: "hide",
							label: {
								show: true,
								formatter: function (params) {
									let a = "";
									let p = Number(params.value).toFixed();
									if (p >= 0) {
										a = p;
										if (p > 999) {
											let parts = p.toString().split(".");
											parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
											a = parts.join(".");
										}
									}
									return a;
								},
								backgroundColor: this.colors[1],
							},
						},
					},
				],
				series: [
					{
						type: "line",
						// yAxisIndex: 0,
						// stack: "all",//堆叠图，但是因为yxiosIndex所以没效果
						symbol: "circle", //显示折点
						// showSymbol: false, //是否显示 symbol, false 则只有在 tooltip hover 的时候显示。
						smooth: true, //平滑
						areaStyle: {
							opacity: 0.2,
							color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: "rgb(255, 189, 127)",
								},
								{
									offset: 1,
									color: "rgb(0, 0, 0)",
								},
							]),
						},
						// name: this.lineData.legendData[0].name,
						// data: this.lineData.arr1
					},
					{
						type: "line",
						yAxisIndex: 1,
						// stack: "all",
						symbol: "circle", //显示折点
						// showSymbol: false, //是否显示 symbol, false 则只有在 tooltip hover 的时候显示。
						// smooth: true, //平滑
						areaStyle: {
							opacity: 0.2,
							color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: "rgb(255, 241, 194)",
								},
								{
									offset: 1,
									color: "rgb(0, 0, 0)",
								},
							]),
						},
						// name: this.lineData.legendData[1].name,
						// data: this.lineData.arr2
					},
				],
			};
			this.chart.setOption(this.option);
		},
		updateChart() {
			const dataOption = {
				xAxis: [
					{
						data: this.lineData.startData,
					},
				],
				legend: {
					data: this.lineData.legendData,
				},
				series: [
					{
						name: this.lineData.legendData[0].name,
						data: this.lineData.arr1,
					},
					{
						name: this.lineData.legendData[1].name,
						data: this.lineData.arr2,
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
	watch: {
		lineData: {
			handler(newVal) {
				console.log(newVal);
				this.updateChart();
			},
			deep: true,
		},
	},
};
</script>
 
<style lang = "scss" scoped>
</style>