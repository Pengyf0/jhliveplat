<template>
    <el-table :data="moreData" v-if="checkId=='0'">
        <el-table-column property="sort" label="排名" width="80"></el-table-column>
        <el-table-column property="name" label="一级分行"></el-table-column>
        <el-table-column property="weekSignMct" label="本周签约商户数"></el-table-column>
        <el-table-column property="weekSignStore" label="本周签约门店数"></el-table-column>
        <el-table-column property="cntSignMct" label="累计签约商户数"></el-table-column>
        <el-table-column property="cntSignStore" label="累计签约门店数"></el-table-column>
    </el-table>
    <el-table :data="moreData" v-else-if="checkId=='1'">
        <el-table-column property="sort" label="排名" width="80"></el-table-column>
        <el-table-column property="name" label="一级分行"></el-table-column>
        <el-table-column property="weekOrderNum" label="本周订单笔数"></el-table-column>
        <el-table-column property="weekSigncashout" label="本周抵扣金额"></el-table-column>
        <el-table-column property="cntOrderNum" label="累计订单金额"></el-table-column>
        <el-table-column property="cntSigncashout" label="累计抵扣金额"></el-table-column>
    </el-table>
    <el-table :data="moreData" v-else>
        <el-table-column property="sort" label="排名" width="80"></el-table-column>
        <el-table-column property="name" label="商户名称"></el-table-column>
        <el-table-column property="brandName" label="品牌名称"></el-table-column>
        <el-table-column property="weekSignStore" label="本周订单数"></el-table-column>
        <el-table-column property="weekCashoutNum" label="本周抵扣金额"></el-table-column>
        <el-table-column property="cntCashoutNum" label="累计抵扣金额"></el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {


        }
    },
    props: {
        moreData: {
            type: Array,
            default: () => []
        },
        checkId: {
            type: Number,
            default: 0
        }
    }
}
</script>
 
<style lang = "scss" scoped>
.el-table {
    background-color: rgba(48, 71, 138, 0.5) !important;
    color: #fff;

    :deep(tr) {
        background-color: rgba(11, 27, 49, .5);
        color: #fff;

        &:hover>td.el-table__cell {
            background-color: rgba(11, 27, 49, 0.5);
        }
    }

    :deep(th.el-table__cell) {
        background-color: rgba(13, 159, 237, 0.8);
        color: #fff;
    }

    :deep(.el-table__cell) {
        padding: 8px 0;
    }

}
</style>