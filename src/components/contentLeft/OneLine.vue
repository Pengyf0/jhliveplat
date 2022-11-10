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
			// 平均值数组
			average: [],
		};
	},
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
	mounted() {
		this.initChart();
		this.updateChart();
	},
	methods: {
		initChart() {
			this.option = {
				tooltip: {
					trigger: "axis",
					backgroundColor: "rgb(253,233,42)",
					axisPointer: {
						lineStyle: {
							color: "rgb(126,199,255)",
						},
					},
					formatter: (p) => {
						let dom = `<div style="width: 100px;height: 15px;;color:#fff;position: relative;">
            <div>
                <span style="font-size:18px;color:#000000;padding:0px 4px;line-height:15px">${
									p[0] ? p[0].data : ""
								}</span>
            </div>
    </div>`;
						return dom;
					},
				},

				grid: {
					top: "20%",
					left: "5%",
					right: "10%",
					bottom: "10%",
					containLabel: true,
				},
				legend: {
					itemHeight: 10,
					itemWidth: 10,
					right: "40",
					top: "20",
					data: [
						{
							name: "用户数",
							// 强制设置图形为圆。
							icon: "circle",
						},
						{
							name: "平均线",
							icon: "circle",
						},
					],
					textStyle: { color: "#fff" },
				},
				xAxis: [
					{
						type: "category",
						boundaryGap: false,
						axisLine: {
							//坐标轴轴线相关设置。数学上的x轴
							show: true,
							lineStyle: {
								color: "rgb(41,188,245)",
							},
						},
						axisLabel: {
							//坐标轴刻度标签的相关设置
							textStyle: {
								color: "#78bdf5",
								// color:"#fff",
								padding: 5,
								fontSize: 12,
							},
							formatter: function (data) {
								return data;
							},
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: "#233653",
							},
						},
						axisTick: {
							show: false,
						},
					},
				],
				yAxis: [
					{
						min: "dataMin",
						type: "value",
						splitLine: {
							show: true,
							lineStyle: {
								color: "rgb(41,188,245)",
							},
						},
						axisLine: {
							show: false,
							lineStyle: {
								color: "#233653",
							},
						},
						axisLabel: {
							show: true,
							textStyle: {
								// color: '#78bdf5',
								color: "#fff",
								padding: 5,
							},
						},
						axisTick: {
							show: false,
						},
					},
				],
				series: [
					{
						name: "用户数",
						type: "line",
						// symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
						// showAllSymbol: false,
						// symbolSize: 15,
						smooth: true,
						lineStyle: {
							width: 2,
							color: "rgb(42,191,250)", // 线条颜色
						},
						itemStyle: {
							color: "rgb(42,191,250)",
						},
						markLine: {
							show: true,
						},
						areaStyle: {
							//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
							color: this.$echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: "rgba(42,191,250,.4)",
									},
									{
										offset: 1,
										color: "rgba(242,191,250, 0)",
									},
								],
								false
							),
						},
					},
					{
						name: "平均线",
						type: "line",
						showAllSymbol: true,
						symbol: "none",
						itemStyle: {
							color: "#e3b337",
						},
						lineStyle: {
							width: 2,
							type: "dotted",
							color: "#e3b337",
							shadowColor: "#FFF500",
							shadowBlur: 12,
						},
					},
				],
			};
			this.chart = this.$echarts.init(document.getElementById(this.id));
			this.chart.setOption(this.option);
		},
		updateChart() {
			// 处理平均值
			let num = 0;
			for (let i = 0; i < this.lineData.dataValue.length; i++) {
				num += this.lineData.dataValue[i];
			}
			for (let i = 0; i < this.lineData.dataValue.length; i++) {
				this.average.push(num / this.lineData.dataValue.length);
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
					{
						data: [...this.average],
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