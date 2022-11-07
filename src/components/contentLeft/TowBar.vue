<template>
    <div class="height">
        <dv-border-box-10>
            <titleEchart :title="title"></titleEchart>
            <ul class="user_Overview flex">
                <li class="user_Overview-item" style="color: #00fdfa">
                    <div class="user_Overview_nums allnum ">
                        {{addPoint[0]}}
                    </div>
                    <p>{{isJiFen?'本周':'昨日注册'}}</p>
                </li>
                <li class="user_Overview-item" style="color: #e3b337">
                    <div class="user_Overview_nums offline">
                        {{addPoint[1]}}
                    </div>
                    <p>{{isJiFen?'上周':'累计商户'}}</p>
                </li>
            </ul>
        </dv-border-box-10>
    </div>
</template>

<script>
import titleEchart from "@/components/title/titleEchart.vue"
import { mapState } from "vuex"
export default {
    data() {
        return {
        }
    },
    components: {
        titleEchart
    },
    props: {
        title: {
            type: String,
            default: "新增积分用户数",
        },
        addPoint:{
            type:Array,
            default:()=>[],
        },
       
    },
    computed:{
        ...mapState(['isJiFen'])
    }
}
</script>
 
<style lang = "scss" scoped>
.user_Overview {
    li {
        flex: 1;

        p {
            text-align: center;
            font-size: 16px;
        }

        .user_Overview_nums {
            width: 125px;
            height: 125px;
            text-align: center;
            line-height: 125px;
            font-size: 16px;
            font-weight: bold;
            margin: 40px auto 20px;
            background-size: cover;
            background-position: center center;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

        }

        .allnum {
            &::before {
                background: url("@/assets/images/left_top_lan.png") no-repeat;
                background-size: 125px 125px;
            }
        }

        .offline {
            &::before {
                background-image: url("@/assets/images/left_top_huang.png");
                background-size: 125px 125px;
            }
        }

    }
}
</style>