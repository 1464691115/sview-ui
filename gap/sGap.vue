<template>
  <view class="s-gap" :style="gapStyle" />
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
import { Px } from "../utils";

interface Props {
  /** 背景颜色 */
  bgColor?: string;
  /** 间隔槽高度，单位px */
  height?: number | string;
  /** 与前一个元素的距离，单位px */
  marginTop?: number;
  /** 与后一个元素的距离，单位px */
  marginBottom?: number;
}
const props = defineProps<Props>();

const gapStyle = computed<CSSProperties>(() => ({
  background: props.bgColor || "transparent",
  height: Px(props.height || 20, "px"),
  marginTop: Px(props.marginTop || 0),
  marginBottom: Px(props.marginBottom || 0),
}));
</script>
<style scoped>
.s-gap {
  width: 100%;
}
</style>
