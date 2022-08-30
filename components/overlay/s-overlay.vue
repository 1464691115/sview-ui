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
import { computed, CSSProperties, onUnmounted, watch } from "vue";

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

watch(
  () => props.modelValue,
  (val) => {
    let m = function (e) {
      e.preventDefault();
    };
    if (val) {
      //停止页面滚动
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", m, { passive: false }); //禁止页面滑动
    } else {
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", m, { passive: true } as any);
    }
  }
);

function handleTapOverlay(e) {
  emits("update:modelValue", !props.modelValue);
  emits("click", e);
}

onUnmounted(() => {
  document.body.style.overflow = ""; //出现滚动条
});
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
