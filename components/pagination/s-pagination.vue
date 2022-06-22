<template>
	<view class="s-pagination">
		<view @click="handleChange(+props.current - 1)">
			<SIcon icon="left" size="64" color="rgba(0, 0, 0, 0.6)" />
		</view>
		<view class="content">
			<input v-model="inputVal" type="number" class="input" @confirm="handleSubmit" />

			<picker mode="selector" :value="optionsIndex" :range="optionsList" @change="handleChange">
				<SIcon icon="down" size="64" color="rgba(0, 0, 0, 0.6)" />
			</picker>
		</view>
		<view @click="handleChange(+props.current + 1)">
			<SIcon icon="right" size="64" color="rgba(0, 0, 0, 0.6)" />
		</view>
	</view>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { showToast } from "sview-ui";
import SIcon from "../icon";
interface Props {
	/** 当前页数 */
	current: number
	/** 总页数 */
	total?: number
}

const props = defineProps<Props>();
const emits = defineEmits<{
	(e: 'update:current', index: number): void
	(e: 'reload', index: number): void
}>();

const inputVal = ref(props.current)

const optionsList = computed(() => new Array(props.total ? +props.total : 1).fill('').map((_, index) => index + 1))
const optionsIndex = computed(() => optionsList.value.findIndex(el => props.current == el) || 0)

function handleChange(e) {
	const _val = typeof e == 'number' ? e : optionsList.value[e.detail.value]
	const _len = optionsList.value.length
	try {
		if (_val > _len) throw '到底了'
		if (_val == 0) throw '请选择大于0的页数'
		emits('update:current', _val)
		emits('reload', _val)
		inputVal.value = _val
	} catch (error) {
		if (typeof error == 'string') showToast(error);
		throw error
	}
}

function handleSubmit(e) {
	const _val = e.detail.value
	const old_val = props.current
	try {
		handleChange(+_val)
	} catch (error) {
		inputVal.value = old_val
	}
}

</script>
<style lang="scss" scoped>
.s-pagination {
	width: 100%;
	display: flex;
	align-items: center;

	.content {
		$height: 64rpx;
		width: 132rpx;
		height: $height;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border: 2rpx solid #DCDCDC;
		border-radius: 6rpx;

		.input {
			text-align: center;
			line-height: $height;
			height: $height;
			color: rgba(0, 0, 0, 0.6);
		}
	}
}
</style>