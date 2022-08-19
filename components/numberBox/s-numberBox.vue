<template>
	<view class="s-numberBox" :style="numberBoxStyle">
		<view class="icon-minus" @click="handleChange(+inputVal - 1)">
			<SIcon icon="minus" size="24" />
		</view>
		<view class="content">
			<input v-model="inputVal" type="number" class="input" @confirm="handleChange" />
		</view>
		<view class="icon-plus" @click="handleChange(+inputVal + 1)">
			<SIcon icon="add" size="24" color="#fff" />
		</view>
	</view>
</template>
<script lang="ts" setup>
import { computed, CSSProperties, reactive, ref, watch } from "vue";
import SIcon from "../icon/s-icon.vue";
import { showToast } from "sview-ui";

interface Props {
	customerStyle?: CSSProperties
	value: any
	/** 用户可输入的最小值 */
	min?: number
	/** 用户可输入的最大值 99999 */
	max?: number
}
const props = defineProps<Props>();
const emits = defineEmits<{
	(e: 'change', val: string | number): void
}>()



const inputVal = ref()

const numberBoxStyle = computed<CSSProperties>(() => ({
	...(props.customerStyle || {})
}));

const defP = reactive({
	min: props.min || 1,
	max: props.max || 99999,
})


watch(() => props.value, val => inputVal.value = val, { immediate: true })


function handleChange(e) {
	const _val = typeof e == 'number' ? e : e.detail.value
	const old_val = props.value

	try {
		if (_val < defP.min) throw `不能小于${defP.min}`
		if (_val > defP.max) throw `不能大于${defP.max}`
		emits('change', _val)
		inputVal.value = _val
	} catch (error) {
		if (typeof error == 'string') showToast(error);
		inputVal.value = old_val
		throw error
	}
}


</script>
<style lang="scss" scoped>
.s-numberBox {
	$height: 48rpx;
	display: flex;

	.icon-minus,
	.icon-plus,
	.content {
		margin: 0 4rpx;
		width: 48rpx;
		height: $height;
		border-radius: 6rpx;
		border: 2rpx solid $primary;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.content {
		min-width: 64rpx;
		border-color: #DCDCDC;

		.input {
			text-align: center;
			line-height: $height;
			height: $height;
			color: rgba(0, 0, 0, 0.6);
		}
	}

	.icon-plus {
		background-color: $primary;
	}

	.icon-minus {
		color: $primary;
	}
}
</style>