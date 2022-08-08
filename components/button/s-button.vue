<template>
  <view class="s-button"
    :class="[props.plain ? 'plain' : 'back', props.type && !props.plain && 'onPlain', props.type || 'info']"
    :style="buttonStyle">
    {{ props.title || "" }}
  </view>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
import { shape } from "sview-ui";
interface Props {
  /** 显示文字 */
  title: string;
  /** 按钮的样式类型 */
  type?: "info" | "primary" | "error" | "warning" | "success";
  /** 按钮外观形状，见上方说明 */
  shape?: shape;
  /** 按钮是否镂空，背景色透明 */
  plain?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  customStyle?: CSSProperties;
}
const props = defineProps<Props>();


const buttonStyle = computed<CSSProperties>(() => ({
  borderRadius:
    props.shape != "square"
      ? (props.customStyle && props.customStyle.height) || `80rpx`
      : "12rpx",
  opacity: props.disabled === true ? 0.4 : 1,
  ...(props.customStyle || {}),
}));
</script>
<style lang="scss" scoped>
.s-button {
  width: 100%;
  height: 80rpx;
  border: 1px solid transparent;
  font-size: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}


.s-button.back {
  color: #000;
}

.info {
  color: #909399;
  border-color: rgba(0, 0, 0, 0.2);
  background: transparent;
}

.primary {
  color: $primary;
  border-color: $primary;
  background: $primary;
}

.success {
  color: $success;
  border-color: $success;
  background: $success;
}

.warning {
  color: $warning;
  border-color: $warning;
  background: $warning;
}

.error {
  color: $error;
  border-color: $error;
  background: $error;
}

.s-button.plain {
  background: transparent;
}

.s-button.onPlain {
  color: #fff;
}
</style>
