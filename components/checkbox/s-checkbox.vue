<template>
  <view
    class="s-checkbox"
    :class="[checkVal && 's-checkbox-right']"
    :style="checkboxStyle"
    @click="handleTapCheck"
  >
    <view class="s-checkbox_con" :style="checkboxConStyle">
      <s-icon
        icon="check"
        color="#fff"
        size="16px"
        :customStyle="{ fontWeight: 'bold' }"
      />
    </view>
    <slot />
    <text v-if="!$slots.default">{{ checkboxProps.label || "" }}</text>
  </view>
</template>
<script lang="ts" setup>
import { useComponentsProps } from "sview-ui/hooks/useComponentsProps";
import type { shape } from "sview-ui";
import { computed, CSSProperties } from "vue";

interface Props {
  name: string;
  shape?: shape;
  customStyle?: CSSProperties;
  label?: string;
  modelValue?: boolean;
  /** 兼容小程序的 v-bind 用法 */
  customProps?: Omit<Props, "customProps">;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "change", data: Record<Props["name"], boolean>);
  (e: "update:modelValue", val: boolean);
}>();

const checkboxProps = useComponentsProps(props);

const checkboxStyle = computed<CSSProperties>(() => ({}));
const checkboxConStyle = computed<CSSProperties>(() => ({
  borderRadius: checkboxProps.shape != "square" ? `51%` : "3px",
  ...(checkboxProps.customStyle || {}),
}));
const checkVal = computed(() => checkboxProps.modelValue);

function handleTapCheck() {
  emits("change", { [checkboxProps.name]: !checkVal.value });
  emits("update:modelValue", !checkVal.value);
}
</script>
<style lang="scss" scoped>
.s-checkbox {
  margin: 4px 10px;
  width: 100%;
  display: flex;
  align-items: center;

  font-size: 14px;
  line-height: 14px;

  .s-checkbox_con {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(200, 201, 204);

    transition: all 200ms;

    .s-icon {
      margin-right: 2px;
    }
  }
}

.s-checkbox-disable {
  color: rgb(200, 201, 204);
  cursor: not-allowed;
}

.s-checkbox-right {
  .s-checkbox_con {
    background-color: $primary;
    border-color: $primary;
  }
}
</style>
