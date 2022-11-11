<template>
	<div class="height">
		<dv-border-box-11 title="最新数据排名">
			<div class="pad">
				weqeeqeqe
				<!-- <dv-scroll-board :config="config" style="width:830px;height:270px;" /> -->
			</div>
		</dv-border-box-11>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		config: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
 
<style lang = "scss" scoped>
.height {
	position: relative;
}

.pad {
	opacity: 0.85;
	border-radius: 20px;
	overflow: hidden;
	position: absolute;
	left: 15px;
	top: 55px;
}
</style>