<template>
	<view class="s-empty" :style="emptyStyle">
		<image class="icon" :src="props.icon || modeList[props.mode || 'list']" :style="imageStyle || {}" />
		<view class="text">{{ props.text || "" }}</view>
	</view>
</template>
<script lang="ts" setup>
import { computed, CSSProperties, reactive } from "vue";
import { Px } from "sview-ui";
import baseImg from "./lib/baseImg";
interface Props {
	/** 图片路径，建议绝对路径 优先级高于 mode */
	icon?: string
	/** 文字提示 */
	text?: string
	/** 组件到上一个元素的间距 */
	marginTop?: number | string
	/** 展示图片的类型 默认 list */
	mode?: keyof typeof modeList,
	customerStyle?: CSSProperties
	/** 图片样式 */
	imageStyle?: CSSProperties
}

const props = defineProps<Props>();
const modeList = reactive(baseImg)
const emptyStyle = computed<CSSProperties>(() => ({
	...(props.customerStyle || {}),
	marginTop: Px(props.marginTop || 0)
}));
</script>
<style lang="scss" scoped>
.s-empty {
	padding: 100rpx 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #fff;

	.icon {
		width: 200rpx;
		height: 200rpx;
	}

	.text {
		margin-top: 30rpx;
		font-size: 30rpx;
		color: #333;
	}
}
</style>
