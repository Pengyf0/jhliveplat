<template>
    <div id="index" ref="appRef">
        <dv-loading v-if="!flag" class="loading">Loading...</dv-loading>
        <div class="bgc">
            <headerView :text="text"></headerView>
            <div class="centent" v-if="flag">
                <div class="contentLeft">
                    <div class="column">
                        <div class="Title">{{ isJiFen ? '最新用户数据' : '实时用户数据' }}</div>
                        <div class="leftBox">
                            <transition name="ltop1" appear>
                                <DbYLineVue :lineData="lineData" v-if="isJiFen"></DbYLineVue>
                                <OneLine
                                    v-else
                                    title="累计注册用户"
                                    :lineData="lineOneData"
                                    id="firstLine"
                                ></OneLine>
                            </transition>
                        </div>
                        <div class="leftBox">
                            <transition name="ltop2" appear>
                                <DbYLineVue
                                    :lineData="linePayData"
                                    title="积分支付金额"
                                    id="payLine"
                                    v-if="isJiFen"
                                ></DbYLineVue>
                                <OneLine
                                    v-else
                                    title="日活用户趋势"
                                    :lineData="lineTwoData"
                                    id="secondLine"
                                ></OneLine>
                            </transition>
                        </div>
                        <div class="leftBox">
                            <transition name="ltop3" appear>
                                <TowBar v-if="isJiFen" :addPoint="addPoint"></TowBar>
                                <OneLine
                                    v-else
                                    title="当日新增注册"
                                    :lineData="lineThreeData"
                                    id="thirdLine"
                                ></OneLine>
                            </transition>
                        </div>
                        <div class="leftBox">
                            <transition name="ltop4" appear>
                                <TowBar :addPoint="addPoint" title="昨日注册和累计商户" v-if="!isJiFen"></TowBar>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="contentCenter">
                    <!-- 上方数字 -->
                    <div class="barNav">
                        <transition name="bMap" appear>
                            <div v-show="isAni">
                                <dv-border-box-8 >
                                    <ul class="flex border">
                                        <li> <countTo
                                            :startVal="0"
                                            :endVal="+MainIndicators.regApntCustNum || 0"
                                            :duration="3000"
                                        ></countTo>
                                        </li>
                                        <li>
                                           <countTo
                                            :startVal="0"
                                            :endVal="+MainIndicators.apntDealUserNum || 0"
                                            :duration="3000"
                                           ></countTo>
                                        </li>
                                        <li>
                                            <countTo
                                            :startVal="0"
                                            :endVal="+MainIndicators.apntCashoutAmt || 0"
                                            :duration="3000"
                                           ></countTo>
                                        </li>
                                    </ul>
                                </dv-border-box-8>
                                <ul class="flex">
                                    <li>{{ isJiFen ? '积分用户累计' : '累计注册' }}</li>
                                    <li>{{ isJiFen ? '积分交易用户累计' : '日活' }}</li>
                                    <li>
                                        {{ isJiFen ? '支付抵扣金额累计' : '月活' }}
                                       
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                    <div class="column">
                        <div class="centerBoxTop">
                            <transition name="bMap2" appear>
                                <ChinaMap :mapData="mapData" v-show="isAni" />
                            </transition>
                        </div>
                        <div class="centerBoxBottom">
                            <transition name="bTab" appear>
                                <TabForm :config="config" v-show="isAni" />
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="contentRight">
                    <div class="column">
                        <div class="Title" >分行龙虎榜</div>
                        <div class="rightBox">
                            <transition name="rTop1" appear>
                                <XAxisBar
                                    :title="barTitle1"
                                    id="barOne"
                                    :barData="barOneData"
                                    v-show="isAni"
                                />
                            </transition>
                            <span @click="add(0)" v-if="isJiFen">查看更多</span>
                        </div>
                        <div class="rightBox">
                            <transition name="rTop2" appear>
                                <XAxisBar
                                    :title="barTitle2"
                                    id="barTow"
                                    :barData="barTwoData"
                                    v-show="isAni"
                                />
                            </transition>
                            <span @click="add(1)" v-if="isJiFen">查看更多</span>
                        </div>
                        <div class="rightBox">
                            <transition name="rTop3" appear>
                                <XAxisBar
                                    :title="barTitle3"
                                    id="barThree"
                                    :barData="barThreeData"
                                    v-show="isAni"
                                />
                            </transition>
                            <span @click="add(2)" v-if="isJiFen">查看更多</span>
                        </div>
                        <div class="rightBox">
                            <transition name="rTop4" appear>
                                <TowPie :pieData="pieData" v-show="isAni" />
                            </transition>
                        </div>
                    </div>
                </div>
                <el-dialog
                    :title="moreTitle"
                    :visible.sync="dialogVisible"
                    width="42%"
                    top="200px"
                    :modal="false"
                >
                    <MoreTable :moreData="moreData" :checkId="checkId" />
                </el-dialog>
            </div>
        </div>
        <div class="map" v-if="flag">
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
        </div>
        <div class="btn" v-if="flag">
            <div id="shiny-shadow">
                <button @click="changeDap">
                    <i class="el-icon-right"></i>
                    <span>{{ isJiFen ? '切换至平台运营' : '切换至积分大屏' }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import drawMixin from "@/utils/drawMixin"
import headerView from "@/components/header/headerView.vue"
import DbYLineVue from "@/components/contentLeft/DbYLine.vue"
import TowBar from "@/components/contentLeft/TowBar.vue"
import ChinaMap from "@/components/contentCenter/ChinaMap.vue"
import TabForm from "@/components/contentCenter/TabForm.vue"
import XAxisBar from "@/components/contentRIght/XAxisBar.vue"
import TowPie from "@/components/contentRIght/TowPie.vue"
import MoreTable from "@/components/contentRIght/MoreTable.vue"
import countTo from 'vue-count-to';

// 运营部分vue-to
import OneLine from "@/components/contentLeft/OneLine.vue"
import { mapState } from "vuex"
import { getApntAll } from "@/request/httpApi"
export default {
    mixins: [drawMixin],
    components: {
        headerView,
        DbYLineVue,
        TowBar,
        ChinaMap,
        TabForm,
        XAxisBar,
        TowPie,
        MoreTable,
        OneLine,
        countTo
    },
    data() {
        return {
            flag: false,
            startVal:0,
            endVal:3000,
            text: '',
            // 积分用户数
            lineData: {
                startData: [],
                arr1: [],
                arr2: [],
                legendData: [
                    // { name: "交易数", icon: "rect" },
                    // { name: "累计数", icon: "resct" },
                ]
            },
            // 积分支付额
            linePayData: {
                startData: [],
                arr1: [],
                arr2: [],
                legendData: [
                    { name: "订单额", icon: "rect" },
                    { name: "抵扣金额", icon: "resct" },
                ]
            },
            // 新增积分数
            addPoint: [0, 0],
            // 中间主要指标 默认数据
            MainIndicators: {},
            mapData: {
                //地图数据
                mapArr: []
            },
            // 中间列表
            config: {
                index: true,
                indexHeader: "排名",
                columnWidth: [70],
                align: ['center'],
                rowNum: 7,
                evenRowBGC: "#306c86",
            },
            // 右侧那个柱状图数据
            barOneData: {
                name: [],
                value: []
            },
            barTwoData: {
                name: [],
                value: []
            },
            barThreeData: {
                name: [],
                value: []
            },
            //右侧百分比
            pieData: {
                orderValue: 0,
                userValue: 0
            },
            // 查看更多对话框
            dialogVisible: false,
            // 对话框数据
            moreData: [],
            // 点击哪个查看更多
            checkId: "",
            moreTitle: "",
            // 是否是积分大屏
            // isJiFen: true,
            barTitle1: "一级行签约商户数",
            barTitle2: "一级行订单笔数",
            barTitle3: "商户订单笔数",
            // 运营折线图数据
            lineOneData: {
                dataValue: [],
                xLabel: []
            },
            lineTwoData: {
                dataValue: [],
                xLabel: []
            },
            lineThreeData: {
                dataValue: [],
                xLabel: []
            },
            // 切换防抖
            timer: null,
            // 查看更多
            moreSignData: [],
            moreOrderData: [],
            moreSignOrderData: [],
        }
    },
   
    computed: {
        ...mapState(['isJiFen', 'isAni'])
    },
    created() {
        this.getData()
    },
    methods: {
        add(id) {
            // 判断是否多次点击同一个，无需再次请求
            if (this.checkId === id) {
                this.dialogVisible = true;
                return
            }
            this.checkId = id;
            if (id == 0) {
                // 第一个请求
                this.moreData = this.moreSignData
                // [
                //     {
                //         sort: '1',
                //         name: '广州分行',
                //         weekSignMct: 1111,
                //         weekSignStore: 2222,
                //         cntSignMct: 12233,
                //         cntSignStore: 222223
                //     }, {
                //         sort: '2',
                //         name: '深圳分行',
                //         weekSignMct: 1111,
                //         weekSignStore: 2222,
                //         cntSignMct: 12233,
                //         cntSignStore: 2211123
                //     }, {
                //         sort: '3',
                //         name: '重庆分行',
                //         weekSignMct: 222,
                //         weekSignStore: 2222,
                //         cntSignMct: 12233,
                //         cntSignStore: 223323
                //     }, {
                //         sort: '4',
                //         name: '成都分行',
                //         weekSignMct: 255,
                //         weekSignStore: 2222,
                //         cntSignMct: 12233,
                //         cntSignStore: 22233323
                //     },
                //     {
                //         sort: '5',
                //         name: '南京分行',
                //         weekSignMct: 2565,
                //         weekSignStore: 156,
                //         cntSignMct: 12233,
                //         cntSignStore: 22233323
                //     },
                //     {
                //         sort: '6',
                //         name: '北京分行',
                //         weekSignMct: 855,
                //         weekSignStore: 2222,
                //         cntSignMct: 99999,
                //         cntSignStore: 22233323
                //     },
                //     {
                //         sort: '7',
                //         name: '天津分行',
                //         weekSignMct: 989898,
                //         weekSignStore: 2222,
                //         cntSignMct: 20125,
                //         cntSignStore: 22233323
                //     },
                //     {
                //         sort: '8',
                //         name: '太原分行',
                //         weekSignMct: 989898,
                //         weekSignStore: 2222,
                //         cntSignMct: 20125,
                //         cntSignStore: 22233323
                //     },
                //     {
                //         sort: '9',
                //         name: '乌鲁木齐分行',
                //         weekSignMct: 989898,
                //         weekSignStore: 2222,
                //         cntSignMct: 20125,
                //         cntSignStore: 22233323
                //     },
                //     {
                //         sort: '10',
                //         name: '桂林分行',
                //         weekSignMct: 989898,
                //         weekSignStore: 2222,
                //         cntSignMct: 20125,
                //         cntSignStore: 22233323
                //     }
                // ];
                this.moreTitle = "分行积分商户签约情况（以累计的签约门店排序）"
            } else if (id == 1) {
                this.moreData = this.moreOrderData;
                this.moreTitle = "分行积分支付交易情况（以本周积分支付抵扣金额排序）"
            } else {
                this.moreData = this.moreSignOrderData
                this.moreTitle = "商户积分支付交易TOP10 （以本周积分支付抵扣金额排序）"
            }
            this.dialogVisible = true;
        },
        getData() {
            // 判断是运营还是积分平台
            let token = sessionStorage.getItem("userName")
            let jifen = JSON.parse(sessionStorage.getItem('jifen'))
            console.log(token, jifen);
            if (token == "yunying" || jifen === false) {
                this.yunyingReq()
            } else {
                this.jiFenReq()
            }
            // 立即清除，否则会出现自动刷新bug
            if (token) {
                sessionStorage.removeItem('userName')
            }
            setTimeout(() => {
                this.flag = true; //子组件渲染
            }, 200);

        },
        yunyingReq() {
            this.$store.commit("hdIsJiFen", false)
            this.text = "建行生活平台运营数据速览";
            this.lineOneData = {
                dataValue: [91555255, 92515205, 93545255, 94135255, 95555255, 98555255, 100202120],
                xLabel: [
                    "2022/10/02",
                    "2022/10/03",
                    "2022/10/04",
                    "2022/10/05",
                    "2022/10/06",
                    "2022/10/07",
                    "2022/10/08",
                ]
            };
            this.lineTwoData = {
                dataValue: [3989552, 3865865, 3544555, 3255455, 3214124, 3122560, 3000000],
                xLabel: [
                    "2022/9/02",
                    "2022/9/03",
                    "2022/9/04",
                    "2022/9/05",
                    "2022/9/06",
                    "2022/9/07",
                    "2022/9/08",
                ]
            };
            this.lineThreeData = {
                dataValue: [202, 522, 5888, 235, 24585, 50000, 36666],
                xLabel: [
                    "2022/10/02",
                    "2022/10/03",
                    "2022/10/04",
                    "2022/10/05",
                    "2022/10/06",
                    "2022/10/07",
                    "2022/10/08",
                ]
            };
            this.MainIndicators = {
                regApntCustNum: "1112225455",
                apntDealUserNum: "111455",
                apntCashoutAmt: "1225455",
            };
            this.addPoint = ['156,445', '1,255,306'];
            this.mapData.mapArr = [
                {
                    name: "南海诸岛",
                    value: 1222
                },
                {
                    name: '北京',
                    value: 5110
                },
                {
                    name: '天津',
                    value: 10103
                },
                {
                    name: '上海',
                    value: 40170
                },
                {
                    name: '重庆',
                    value: 700500
                },
                {
                    name: '河北',
                    value: 14
                },
                {
                    name: '河南',
                    value: 85430000
                },
                {
                    name: '云南',
                    value: 11142
                },
                {
                    name: '辽宁',
                    value: 19572555
                },
                {
                    name: '黑龙江',
                    value: 155555
                },
                {
                    name: '湖南',
                    value: 6955
                },
                {
                    name: '安徽',
                    value: 6055555
                },
                {
                    name: '山东',
                    value: 39555555
                },
                {
                    name: '新疆',
                    value: 4555
                },
                {
                    name: '江苏',
                    value: 3155
                },
                {
                    name: '浙江',
                    value: 104112
                },
                {
                    name: '江西',
                    value: 364
                },
                {
                    name: '湖北',
                    value: 105225422
                },
                {
                    name: '广西',
                    value: 0
                },
                {
                    name: '甘肃',
                    value: 72
                },
                {
                    name: '山西',
                    value: 95
                },
                {
                    name: '内蒙古',
                    value: 744440
                },
                {
                    name: '陕西',
                    value: 2242475
                },
                {
                    name: '吉林',
                    value: 41122004
                },
                {
                    name: '福建',
                    value: 1800
                },
                {
                    name: '贵州',
                    value: 224
                },
                {
                    name: '广东',
                    value: 15
                },
                {
                    name: '青海',
                    value: 14444
                },
                {
                    name: '西藏',
                    value: 22255558
                },
                {
                    name: '四川',
                    value: 2244
                },
                {
                    name: '宁夏',
                    value: 4005277
                },
                {
                    name: '海南',
                    value: 22
                },
                {
                    name: '台湾',
                    value: 304444
                },
                {
                    name: '香港',
                    value: 544444
                },
                {
                    name: '澳门',
                    value: 54
                }
            ];
            let config = null
            config = {
                header: ['城市', '累计注册', '昨日日活'],
                carousel: "page",
                data: [
                    ['江苏', '21,722', '10,455'],
                    ['深圳', '21,722', '10,455'],
                    ['四川', '21,722', '10,455'],
                    ['陕西', '21,722', '10,455'],
                    ['广东', '21,722', '10,455'],
                    ['重庆', '21,722', '10,455'],
                    ['北京', '21,722', '10,455'],
                    ['黑龙', '2,722', '10,455'],
                    ['福建', '2,722', '10,455'],
                    ['湖南', '2,722', '10,455'],
                    ['浙江', '2,722', '10,455'],
                    ['广西', '2', '10,45'],
                ]
            }
            this.config = Object.assign({}, this.config, config)
            this.barTitle1 = "累计用户数";
            this.barTitle2 = "日活用户数";
            this.barTitle3 = "新增用户数";
            this.barOneData = {
                name: ['广州', '重庆', '汕尾', '厦门', '四川'],
                value: [231044, 100470, 12934, 9348, 1282,]
            };
            this.barTwoData = {
                name: ['深圳', '桂林', '陆丰', '漳州', '四川'],
                value: ['23104', '10070', '8934', '5348', '5282',]
            };
            this.barThreeData = {
                name: ['北京', '天津', '长沙', '南宁', '株洲'],
                value: ['201044', '100470', '82934', '59348', '45282',]
            };
            this.pieData = {
                orderValue: 20.3,
                userValue: 89.2
            };
        },
        async jiFenReq() {
            this.$store.commit("hdIsJiFen", true)
            this.text = "建行生活积分数据大屏";
            // 请求
            let res = await getApntAll()
            console.log(res);
            // 左边line图数据处理 
            let ljsLData = res.ljsL.map(item => {
                return item.d
            })
            let ljsLV = res.ljsL.map(item => {
                return Number(item.v)
            })
            let yhsLV = res.yhsL.map(item => {
                return Number(item.v)
            })
            // this.lineData.arr1 = ljsLV.reverse();
            // this.lineData.arr2 = yhsLV.reverse();
            let lineOneData = {
                startData: ljsLData.reverse(),
                arr1: ljsLV.reverse(),
                arr2: yhsLV.reverse(),
                legendData: [
                    { name: "交易数", icon: "rect" },
                    { name: "累计数", icon: "resct" },
                ]
            }
            this.lineData = Object.assign({}, lineOneData)

            let ddeLV = res.ddeL.map(item => {
                return Number(item.v)
            })
            let dkeLV = res.dkeL.map(item => {
                return Number(item.v)
            })
            this.linePayData.startData = ljsLData
            this.linePayData.arr1 = ddeLV.reverse();
            this.linePayData.arr2 = dkeLV.reverse();

            // 左边pie图数据处理 
            // console.log(Number(res.szxz["v"]).toLocaleString());
            this.addPoint = [Number(res.bzxz["v"]).toLocaleString(), Number(res.szxz["v"]).toLocaleString()]

            // 中间数据处理
            this.MainIndicators = {
                regApntCustNum: Number(res.ljs["v"]),
                apntDealUserNum: Number(res.yhs["v"]),
                apntCashoutAmt: Number(res.dke["v"]),
            };
            //待处理
            this.mapData.mapArr = [
                {
                    name: "南海诸岛",
                    value: 0
                },
                {
                    name: '北京',
                    value: 511004
                },
                {
                    name: '天津',
                    value: 101013
                },
                {
                    name: '上海',
                    value: 4011770
                },
                {
                    name: '重庆',
                    value: 7005
                },
                {
                    name: '河北',
                    value: 1445573
                },
                {
                    name: '河南',
                    value: 8543
                },
                {
                    name: '云南',
                    value: 11142
                },
                {
                    name: '辽宁',
                    value: 19572555
                },
                {
                    name: '黑龙江',
                    value: 155555
                },
                {
                    name: '湖南',
                    value: 6955
                },
                {
                    name: '安徽',
                    value: 6055555
                },
                {
                    name: '山东',
                    value: 39555555
                },
                {
                    name: '新疆',
                    value: 4555
                },
                {
                    name: '江苏',
                    value: 3155
                },
                {
                    name: '浙江',
                    value: 10411254
                },
                {
                    name: '江西',
                    value: 36425
                },
                {
                    name: '湖北',
                    value: 1052254
                },
                {
                    name: '广西',
                    value: 332545
                },
                {
                    name: '甘肃',
                    value: 725
                },
                {
                    name: '山西',
                    value: 955
                },
                {
                    name: '内蒙古',
                    value: 740
                },
                {
                    name: '陕西',
                    value: 222475
                },
                {
                    name: '吉林',
                    value: 41124
                },
                {
                    name: '福建',
                    value: 18000000
                },
                {
                    name: '贵州',
                    value: 500
                },
                {
                    name: '广东',
                    value: 980777777
                },
                {
                    name: '青海',
                    value: 14
                },
                {
                    name: '西藏',
                    value: 2
                },
                {
                    name: '四川',
                    value: 44000
                },
                {
                    name: '宁夏',
                    value: 400
                },
                {
                    name: '海南',
                    value: 22
                },
                {
                    name: '台湾',
                    value: 304444
                },
                {
                    name: '香港',
                    value: 544444
                },
                {
                    name: '澳门',
                    value: 54
                }
            ];
            // 处理列表数据
            let centerData = [];
            res.zxsj.map((item) => {
                centerData.push([item.on, item.acon, item.aoa])
            })

            let configObj = null;
            configObj = {
                header: ['省份', '笔数', '抵扣金额'],
                carousel: "single",
                data: centerData
            }
            // 需要改变config才能进行更新
            this.config = Object.assign({}, this.config, configObj)

            // 右侧数据处理
            this.barTitle1 = "一级行签约商户数";
            this.barTitle2 = "一级行订单笔数";
            this.barTitle3 = "商户订单笔数";
            this.barOneData = {
                name: [],
                value: []
            }
            this.barTwoData = {
                name: [],
                value: []
            }
            this.barThreeData = {
                name: [],
                value: []
            }
            res.shs.map((item) => {
                this.barOneData.name.push(item.on)
                this.barOneData.value.push(item.v)
            })
            res.odds.map((item) => {
                this.barTwoData.name.push(item.on)
                this.barTwoData.value.push(item.v)
            })
            res.mdds.map((item) => {
                this.barThreeData.name.push(item.mn)
                this.barThreeData.value.push(item.v)
            })
            this.pieData = {
                orderValue: Number(res.ddzb) * 100,
                userValue: Number(res.hhszb) * 100
            }

            // 查看更多
            res.qyqk.map((item, index) => {
                this.moreSignData.push({
                    sort: index + 1,
                    name: item.on,
                    weekSignMct: item.smn,
                    weekSignStore: item.ssn,
                    cntSignMct: item.smna,
                    cntSignStore: item.ssna
                })
            })
            res.jyqk.map((item, index) => {
                this.moreOrderData.push({
                    sort: index + 1,
                    name: item.on,
                    weekOrderNum: item.aoa,
                    weekSigncashout: item.acon,
                    cntOrderNum: item.acoaa,
                    cntSigncashout: item.acaa,
                })
            })
            res.mzf.map((item, index) => {
                this.moreSignOrderData.push({
                    sort: index + 1,
                    name: item.mn,
                    brandName: item.bn,
                    weekSignStore: item.amcon,
                    weekCashoutNum: item.amca,
                    cntCashoutNum: item.amcaa
                })
            })

        },
        changeDap() {
            // 实现防抖
            clearTimeout(this.timer);
            // this.flag = false; //子组件渲染
            this.timer = setTimeout(() => {
                // 取反大屏

                this.$store.commit("hdIsJiFen", !this.isJiFen)
                // 切换动画实现
                this.$store.commit("changeIsAni", false)
                this.$store.dispatch("asyncChangeIsAni", true)
                this.$store.commit('hdCount')
                // this.flag = true; //子组件渲染
                if (this.isJiFen) {
                    this.jiFenReq()
                } else {
                    this.yunyingReq()
                }

            }, 500)
        }
    }


}
</script>
 
<style lang = "scss" scoped>
$ycolor: #e3b337;
@font-face {
    font-family: "DS-Digib";
    src: url("../assets/json/DS-DIGIB.ttf");
}

.column {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 20px 0 0 0;
    box-sizing: border-box;

    .Title {
        color: #fff;
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 22px;
        text-shadow: 1px 1px 2px #fff;
    }
}

#index {
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    overflow: hidden;
    padding: 0;
    box-sizing: border-box;
    .bgc {
        background-image: url("@/assets/images/bg.jpg");
        background-size: 100% 100%;
        /* background-size: cover;
        background-position: center center; */
        width: 100%;
        height: 100%;
        // position: relative;

        .centent {
            width: 100%;
            height: calc(100% - 80px);
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            box-sizing: border-box;

            .contentLeft,
            .contentRight {
                width: 480px;

                .leftBox,
                .rightBox {
                    width: 480px;
                    height: 220px;
                    margin-top: 20px;
                }

                .rightBox {
                    position: relative;

                    span {
                        position: absolute;
                        top: 5px;
                        right: 20px;
                        font-size: 14px;
                        background-color: $ycolor;
                        width: 75px;
                        height: 26px;
                        text-align: center;
                        line-height: 26px;
                        border-radius: 13px;
                        cursor: pointer;
                        opacity: 0.8;
                        box-shadow: 0px 0px 5px 5px rgb(56, 85, 175, 0.2) inset;

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }

            .contentCenter {
                width: 860px;
                position: relative;
                z-index: 50;

                .centerBoxTop {
                    height: 612px;
                }

                .centerBoxBottom {
                    // margin-top: 10px;
                    height: 355px;
                }

                .barNav {
                    width: 100%;
                    z-index: 100;
                    position: absolute;
                    top: 0;
                    left: 0;
                    color: #fff;
                    padding: 8px;
                    box-sizing: border-box;
                    background-color: rgba(101, 132, 226, 0.2);

                    ul {
                        li {
                            font-weight: bold;
                            flex: 1;
                            text-align: center;
                            position: relative;
                        }
                    }

                    .border {
                        padding: 10px;
                        box-sizing: border-box;
                        font-family: DS-Digib;
                        li {
                            font-size: 30px;
                            color: $ycolor;
                        }

                        li:before {
                            position: absolute;
                            content: "";
                            height: 50%;
                            width: 1px;
                            background: rgba(255, 255, 255, 0.2);
                            right: 0;
                            top: 25%;
                        }
                    }
                }
            }
        }
    }

    .map {
        position: absolute;
        top: 50%;
        left: 50%;

        // // 大屏动态背景设置
        .map1 {
            width: 640px;
            height: 640px;
            background: url("@/assets/images/lbx.png") no-repeat center;
            background-size: 500px 500px;
            animation: myfirst2 15s infinite linear;
            z-index: 2;
        }

        .map2 {
            width: 566px;
            height: 566px;
            background: url("@/assets/images/jt.png") no-repeat center;
            background-size: 450px 450px;
            z-index: 5;
            animation: myfirst 10s infinite linear;
        }

        .map3 {
            width: 518px;
            height: 518px;
            background: url("@/assets/images/map.png") no-repeat center;
            background-size: 410px 410px;
            z-index: 2;
            opacity: 0.85;
        }

        .map1,
        .map2,
        .map3 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .btn {
        position: absolute;
        top: 20px;
        right: 170px;

        #shiny-shadow {
            display: flex;
            align-items: center;
            justify-content: center;
            // height: 30px;
            background-color: rgba(42, 122, 165, 0);
        }

        i {
            position: absolute;
            top: 6px;
            left: 10px;
            color: #e3b337;
            font-size: 24px;
            font-weight: bold;
        }

        button {
            border: 2px solid #fff;
            background: transparent;
            text-transform: uppercase;
            color: #fff;
            padding: 7px 30px 7px 35px;
            outline: none;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            border-radius: 20px;
            font-size: 16px;
        }

        span {
            z-index: 20;
        }

        button:after {
            content: "";
            display: block;
            position: absolute;
            top: -36px;
            left: -100px;
            background: #fff;
            width: 50px;
            height: 125px;
            opacity: 20%;
            transform: rotate(-45deg);
        }

        button:hover:after {
            left: 120%;
            transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
            -webkit-transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
        }
    }
}

.loading {
    z-index: 999;
}

:deep(.el-dialog) {
    background-color: rgba(101, 132, 226, 0.2);

    .el-dialog__close {
        color: #fff;
    }

    .el-dialog__title {
        color: #fff;
    }
}
</style>