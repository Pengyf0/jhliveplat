<template>
    <div class="height">
        <dv-border-box-10>
            <titleEchart :title="title"></titleEchart>
            <div :id="id" style="width: 100%; height: 100%"></div>
        </dv-border-box-10>
    </div>
</template>

<script>
import titleEchart from "@/components/title/titleEchart.vue"
export default {
    data() {
        return {
            option: null,
            chart: null,
            color: ["#75f7f7", "#e3b337", "#FF752D", "#D2B48C", "#7891D9"],
            salvProMax: [],//背景按最大值
        }
    },
    props: {
        barData: {
            type: Object,
            default: () => { },
        },
        title: {
            type: String,
            default: "积分用户数",
        },
        id: {
            type: String,
            default: "",
        }

    },
    components: {
        titleEchart,
    },
    mounted() {
        this.initChart();
        this.updateChart()
    },
    methods: {
        initChart() {
            this.option = {
                color: this.color,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                    position: function (point) {
                        return [point[0], point[1]];
                    },
                    confine: false,
                    formatter: '{b}:{c}'
                },
                grid: {
                    left: "5%",
                    right: "10%",
                    bottom: "10%",
                    top: "25%",
                    containLabel: true
                },
                xAxis: [{
                    type: "value",
                    show: false
                }],
                yAxis: [{
                    type: "category",
                    inverse: true,
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '12',
                        },
                        formatter: (params) => {
                            params = params.length > 5 ? params.substring(0, 5) + '...' : params;
                            return params;
                        },
                    },
                    // data: this.barData.name,
                },
                {
                    // axisTick: 'none',
                    axisLine: 'none',
                    // axisLabel: {
                    //     textStyle: {
                    //         color: '#ffffff',
                    //         fontSize: '16',
                    //     }
                    // },
                    // data: []
                }],
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        yAxisIndex: 0,
                        barWidth: 12,
                        z: 2,
                        itemStyle: {
                            color: (params) => {
                                return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: 'rgba(54,69,129,1)',
                                    },
                                    {
                                        offset: 0.8,
                                        color: this.color[params.dataIndex],
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0.8)',
                                    },
                                ]);
                            },
                        },
                        label: {
                            show: true,
                            position: "outside", //数据显示位置，默认显示在中间
                            color: "#fff", //数据文字颜色
                            fontSize: 12, //数据文字大小
                            formatter: function (p) {
                                let value = "";
                                if (p.value > 0) {
                                    value = p.value;
                                    if (value > 999) {
                                        // 数值加千分号
                                        let parts = value.toString().split(".");
                                        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        value = parts.join(".");
                                    }
                                }
                                return value;
                            },
                        },

                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: 15,
                        barGap: '-100%',
                        itemStyle: {
                            color: '#1B375E',
                            barBorderRadius: [0, 24, 24, 0],
                        },
                        z: 1,
                    },
                ]
            };
            // 初始化echart
            this.chart = this.$echarts.init(document.getElementById(this.id), null,
                { renderer: "svg" })
            this.chart.setOption(this.option)
        },
        updateChart() {
            this.salvProMax = []
            for (let i = 0; i < this.barData.value.length; i++) {
                this.salvProMax.push(this.barData.value[0]);
            }
            const dataOption = {
                yAxis: {
                    data: this.barData.name,
                },
                series: [
                    {
                        data: this.barData.value,
                    },
                    {
                        data: this.salvProMax
                    }
                ]
            }
            this.chart.setOption(dataOption)
        }
    },
    // 销毁操作
    beforeDestroy() {
        this.chart.dispose()
        this.chart = null
    },
    watch: {
        barData: {
            handler() {
                this.updateChart();
            },

            deep: true,
        },
    },
}
</script>
 
<style lang = "scss" scoped>

</style>