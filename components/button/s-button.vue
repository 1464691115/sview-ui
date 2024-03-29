<template>
  <view
    class="s-button"
    :class="[
      buttonProps.plain ? 'plain' : 'back',
      buttonProps.type && !buttonProps.plain && 'onPlain',
      buttonProps.type || 'info',
    ]"
    :style="buttonStyle"
  >
    <slot>
      {{ buttonProps.title || buttonProps.text || "" }}
    </slot>
  </view>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
import { useComponentsProps } from "sview-ui/hooks/useComponentsProps";
import type { shape } from "sview-ui";

interface Props {
  /** 显示文字 */
  title?: string;
  text?: string;
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
  /** 兼容小程序的 v-bind 用法 */
  customProps?: Omit<Props, "customProps">;
}
const props = withDefaults(defineProps<Props>(), {
  plain: undefined,
  disabled: undefined,
});

const buttonProps = useComponentsProps(props);

const buttonStyle = computed<CSSProperties>(() => ({
  borderRadius:
    buttonProps.value.shape != "square"
      ? (buttonProps.value.customStyle && buttonProps.value.customStyle.height) || `80px`
      : "none",
  opacity: buttonProps.value.disabled === true ? 0.4 : 1,
  cursor: buttonProps.value.disabled === true ? "not-allowed" : "pointer",
  ...(buttonProps.value.customStyle || {}),
}));
</script>
<style lang="scss" scoped>
.s-button {
  width: 100%;
  height: 80rpx;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: all 0.15s ease-out;

  &:active {
    opacity: 0.6 !important;
  }
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
