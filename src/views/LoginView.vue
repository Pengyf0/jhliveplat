<template>
    <div class="starry-sky">
        <canvas ref="canvas"></canvas>
        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"
            class="demo-ruleForm login-container">
            <h3 class="title">dap登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码">
                </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="info" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        point: {
            type: Number,
            default: 30 // 生成的星星（点）的个数, 默认25个
        },
        lineColor: {
            type: String,
            default: 'rgba(245, 159, 11)' // 线的颜色
        },
        roundColor: {
            type: String,
            default: 'rgba(45,140,210,.8)' // 星星的颜色
        },
    },
    data() {
        return {
            docWidth: 0, // 画布宽
            docHeight: 0, // 画布高
            context: null, // canvasDom的执行上下文
            circleArr: [], // 圆点数组
            timer: null, // 定时器对象
            logining: false,
            // 记住密码
            ruleForm: {
                //username和password默认为空
                username: 'jifen',
                password: '2347',
            },
            //rules前端验证
            rules: {
                username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        }
    },
    mounted() {
        const canvasDom = this.$refs.canvas

        // 取画布的高宽来设置显示分辨率
        this.docWidth = canvasDom.offsetWidth
        this.docHeight = canvasDom.offsetHeight

        // 设置画布分辨率
        canvasDom.width = canvasDom.offsetWidth
        canvasDom.height = canvasDom.offsetHeight

        // 初始化canvas上下文
        this.context = canvasDom.getContext('2d')

        // 设置线条和星星颜色
        this.context.strokeStyle = this.lineColor;
        this.context.lineWidth = 1;
        this.context.fillStyle = this.roundColor;

        // 初始化
        this.createCircleArr()       // 设置星星数组
        this.draw() // 首屏绘制
        this.cycleDraw() // 循环绘制
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.logining = true
                    setTimeout(() => {
                        this.logining = false
                        if (this.ruleForm.username == "yunying" && this.ruleForm.password == "2347" || this.ruleForm.username == "jifen") {
                            // 弹出登录成功
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            })
                            // 保存token
                            sessionStorage.setItem("userName", this.ruleForm.username)
                            this.$router.push({ path: '/index' })
                        } else {
                            this.$message({
                                message: '账号或密码错误',
                                type: 'error'
                            })
                        }



                    }, 1000)
                } else {
                    this.$message.error('请输入用户名密码！')
                    this.logining = false
                    return false
                }
            })
        },
        /**
         * 生成min和max之间随机数
         */
        rangeRadom(max, min) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        /**
         * 绘制原点
         */
        drawCircle(context, x, y, r, moveX, moveY) {
            let circle = {
                x,
                y,
                r,
                moveX,
                moveY,
            }
            context.beginPath()
            context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
            context.closePath()
            context.fill()
            return circle
        },
        /**
         * 绘制线条
         */
        drawLine(context, beginX, beginY, closeX, closeY, opacity) {
            context.beginPath()
            context.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            context.moveTo(beginX, beginY)
            context.lineTo(closeX, closeY)
            context.closePath()
            context.stroke()
        },
        /**
         * 生成圆点数组
         */
        createCircleArr() {
            for (let i = 0; i < this.point; i++) {
                this.circleArr.push(this.drawCircle(
                    this.context,
                    this.rangeRadom(this.docWidth, 0),
                    this.rangeRadom(this.docHeight, 0),
                    this.rangeRadom(15, 2),
                    this.rangeRadom(10, -10) / 40,
                    this.rangeRadom(10, -10) / 40
                ))
            }
        },
        /**
         * 每一帧绘制
         */
        draw() {
            const circleArr = this.circleArr
            this.context.clearRect(0, 0, this.docWidth, this.docHeight)
            // 循环绘制点
            for (let i = 0; i < this.point; i++) {
                this.drawCircle(this.context, circleArr[i].x, circleArr[i].y, circleArr[i].r)
            }
            // 循环绘制线
            for (let i = 0; i < this.point; i++) {
                for (let j = 0; j < this.point; j++) {
                    if (i + j < this.point) {
                        let A = Math.abs(circleArr[i + j].x - circleArr[i].x)
                        let B = Math.abs(circleArr[i + j].y - circleArr[i].y)
                        let lineLength = Math.sqrt(A * A + B * B)
                        let C = 1 / lineLength * 7 - 0.009
                        let lineOpacity = C > 0.03 ? 0.03 : C;
                        if (lineOpacity > 0) {
                            this.drawLine(
                                this.context,
                                circleArr[i].x,
                                circleArr[i].y,
                                circleArr[i + j].x,
                                circleArr[i + j].y,
                                lineOpacity,
                            )
                        }
                    }
                }
            }
        },
        /**
         * 循环绘制
         */
        cycleDraw() {
            this.timer = setInterval(() => {
                for (let i = 0; i < this.point; i++) {
                    let cir = this.circleArr[i]
                    cir.x += cir.moveX
                    cir.y += cir.moveY
                    if (cir.x > this.docWidth) {
                        cir.x = 0
                    } else if (cir.x < 0) {
                        cir.x = this.docWidth
                    }
                    if (cir.y > this.docHeight) {
                        cir.y = 0
                    } else if (cir.y < 0) {
                        cir.y = this.docHeight
                    }
                }
                this.draw()
            }, 10)
        },
    },
    beforeDestory() {
        // 记得摧毁定时器
        clearInterval(this.timer)
    }
}
</script>
 
<style lang = "scss" scoped>
.starry-sky {
    width: 100%;
    height: 100%;
    background-color: rgba(55, 59, 61, 0.862);

    canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

.login-container {
    border-radius: 10px;
    // margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    padding: 30px 35px 15px 35px;
    background-color: rgba(0, 0, 0, .4);
    border: 2px solid rgba(113, 153, 160, 0.5);
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(115, 145, 146, 0.1);

    .title {
        margin: 0px auto 20px auto;
        text-align: center;
        color: #eaeaea;
    }

    :deep(.el-input__inner) {
        background-color: rgba(0, 0, 0, .1);
        color: #fff;
    }

    :deep(.el-button--info) {
        background-color: rgba(0, 0, 0, .1);
        color: #fff;
    }
}
</style>