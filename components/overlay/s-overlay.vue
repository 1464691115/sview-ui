<template>
  <Transition>
    <view
      v-if="props.modelValue"
      class="s-overlay"
      :style="overlayStyle"
      @click="handleTapOverlay"
    >
      <slot />
    </view>
  </Transition>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
interface Props {
  modelValue?: boolean;
  zIndex?: number;
  duration?: number;
  opacity?: number;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:modelValue", val: boolean);
  (e: "click", event: Event);
}>();

const overlayStyle = computed<CSSProperties>(() => ({
  zIndex: props.zIndex || 10070,
  backgroundColor: `rgba(0, 0, 0, ${props.opacity || 0.5})`,
  transitionDuration: (props.duration || 300) + "ms",
}));

function handleTapOverlay(e) {
  emits("update:modelValue", !props.modelValue);
  emits("click", e);
}
</script>
<style lang="scss" scoped>
.s-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>

<style>

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
