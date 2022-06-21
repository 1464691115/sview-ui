<template>
  <view class="s-tag" :class="[props.type || 'primary']" :style="tagStyle">
    <view class="back" :style="backStyle"></view>
    <text style="z-index: 2;">{{ props.text }}</text>
    <view class="backFF"></view>
  </view>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
import { shape } from "../index";
import { Px } from "../utils";
interface Props {
  /** 不可用 */
  disabled?: string;
  /** 标签高度 */
  height?: string | number;
  /** 标签形状 */
  shape?: shape;
  /** 标签的文字内容 */
  text?: string;
  /** 标签主题色 */
  color?: string
  /** 标签的样式类型 */
  type?: "primary" | "error" | "warning" | "success";
  /** 自定义样式 */
  customStyle?: CSSProperties;
}
const props = defineProps<Props>();
const tagStyle = computed<CSSProperties>(() => ({
  height: Px(props.height || 60),
  borderRadius: Px(props.shape === "circle" ? props.height || 60 : 8),
  ...(props.color ? {
    borderColor: props.color.includes(',') ? `rgba(${props.color}, 1)` : props.color,
    color: props.color.includes(',') ? `rgba(${props.color}, 1)` : props.color
  } : {}),
  ...(props.customStyle || {})
}));

const backStyle = computed<CSSProperties>(() => ({
  ...(props.color ? {
    background: props.color.includes(',') ? `rgba(${props.color}, 0.15)` : props.color,
  } : {}),
}))
</script>
<style lang="scss" scoped>
@import '../lib/style/index.scss';

.s-tag {
  min-width: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 28rpx;
  line-height: 28rpx;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  & .back,
  & .backFF {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 0;
  }

  & .back {
    z-index: 1;
  }
}

.primary {
  border: 2rpx solid $primary;
  color: $primary;

  & .back {
    background-color: rgba($primary, 0.15);
  }
}

.success {
  border: 2rpx solid $success;
  color: $success;

  & .back {
    background-color: rgba($success, 0.15);
  }
}


.warning {
  border: 2rpx solid $warning;
  color: $warning;

  & .back {
    background-color: rgba($warning, 0.15);
  }
}


.error {
  border: 2rpx solid $error;
  color: $error;

  & .back {
    background-color: rgba($error, 0.15);
  }
}
</style>
