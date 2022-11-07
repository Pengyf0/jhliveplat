<template>
	<div
		id="map"
		:style="{ width: '100%', height: '100%', marginTop: '10px' }"
		ref="mapbox"
	></div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
	data() {
		return {
			option: null,
			chart: null,
			name: "",
		};
	},
	props: {
		mapData: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
		...mapState(["isJiFen"]),
	},
	mounted() {
		this.initChart();
	},
	methods: {
		async initChart() {
			let { data: ret } = await axios.get("/json/china.json");
			this.chart = this.$echarts.init(document.getElementById("map"), null, {
				renderer: "svg",
			});
			// 缩放显示
			this.scaleFn();
			this.$echarts.registerMap("china", ret);
			this.option = {
				title: {
					left: 10,
					top: 70,
					text: this.isJiFen ? "积分支付最新数据" : "累计注册最新数据",
					textStyle: {
						color: "#2db5fe",
						fontSize: 22,
					},
				},
				tooltip: {
					show: true,
					trigger: "item",
					formatter: function (a) {
						// 将注册人数改千分位
						let a2 = "";
						let olda = Number(a["data"].value);

						if (olda >= 0) {
							a2 = olda;
							if (olda > 999) {
								let parts = olda.toString().split(".");
								parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								a2 = parts.join(".");
							}
						}
						// 日活兼容
						let a3 = a["data"].ratio ? a["data"].ratio : 0;
						let a1 = a["name"];
						if ((a1 == "台湾省" && !a2) || (a1 == "南海诸岛" && !a2)) {
							return `${a1}<br/> 暂无数据`;
						}

						return `${a1}<br/>累计注册: ${a2}  <br/>日活: ${a3} %`;
					},
				},
				geo: {
					type: "map",
					map: "china",
					zoom: 1.5,
					top: 160,
					label: {
						show: true,
						fontSize: "12",
						color: "rgba(0,0,0,0.7)",
					},
					itemStyle: {
						borderColor: "rgba(0, 0, 0, 0.2)",
						emphasis: {
							areaColor: "#e3b337",
						},
					},
				},
				series: [
					{
						type: "map",
						geoIndex: 0,
						data: this.mapData.mapArr, //有数据才显示颜色
					},
				],

				visualMap: {
					type: "piecewise",
					left: 10,
					bottom: 10,
					showLabel: true, //默认是false
					pieces: [
						{ min: 1000000, label: ">1,000,000" },
						{ min: 100000, max: 1000000, label: "100000-1000000" },
						{ min: 10000, max: 100000, label: "10000-100000" },
						{ max: 10000, label: "<10000" },
					],
					textStyle: {
						color: "#fff",
					},
					text: this.isJiFen ? ["抵扣金额"] : ["累计注册/人"],
					inRange: {
						color: ["#44effb", "#3399ff", "#2b8afe", "#006699"],
					},
				},
			};
			this.chart.setOption(this.option);
		},
		// 缩放显示
		scaleFn() {
			// 缩放显示
			this.$refs.mapbox.setAttribute("class", "animateDiv");
			setTimeout(() => {
				this.$refs.mapbox.setAttribute("class", "");
			}, 1500);
		},
	},
	// 销毁操作
	beforeDestroy() {
		this.chart.dispose();
		this.chart = null;
	},

	watch: {
		mapData: {
			handler() {
				this.initChart();
			},
			deep: true,
		},
	},
};
</script>
 
<style lang = "scss" scoped>
</style>