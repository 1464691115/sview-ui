<template>
  <transition name="fade" :duration="props.duration || 300">
    <view
      v-if="props.show"
      class="s-overlay"
      :style="overlayStyle"
      @click="handleTapOverlay"
    >
      <slot />
    </view>
  </transition>
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
interface Props {
  show?: boolean;
  zIndex?: number;
  duration?: number;
  opacity?: number;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update:show", val: boolean);
  (e: "click", event: Event);
}>();

const overlayStyle = computed<CSSProperties>(() => ({
  zIndex: props.zIndex || 10070,
  backgroundColor: `rgba(0, 0, 0, ${props.opacity || 0.5})`,
}));

function handleTapOverlay(e) {
  emits("update:show", !props.show);
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
