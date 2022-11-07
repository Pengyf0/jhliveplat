<template>
    <div class="Title">
        <div class="zuo"></div>
        <span class="title-inner"> &nbsp;&nbsp;{{ title }}&nbsp;&nbsp; </span>
        <div class="you"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        title: {
            type: String,
            default: () => "",
        },
    }
}
</script>
 
<style lang = "scss" scoped>
.Title {
    // height: 38px;
    width: 100%;
    color: #31abe3;
    top: 5px;
    left: 5px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    .zuo,
    .you {
        width: 58px;
        height: 14px;
        background-image: url("@/assets/images/zuo.png");
    }

    .you {
        transform: rotate(180deg);
    }

    .title-inner {
        font-weight: 900;
        letter-spacing: 1px;
        background: linear-gradient(92deg,
                #0072ff 0%,
                #00eaff 48.8525390625%,
                #01aaff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>