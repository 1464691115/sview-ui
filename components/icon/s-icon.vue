<template>
  <i class="s-icon" :style="iconStyle" v-html="ICON_KEY[props.icon]" />
</template>
<script lang="ts" setup>
import { computed, CSSProperties } from "vue";
import { ICON_KEY } from "./enums";
import { Px } from "sview-ui";
interface Props {
  icon: keyof typeof ICON_KEY;
  size?: string | number;
  color?: string;
  customStyle?: CSSProperties;
}

const props = defineProps<Props>();
const iconStyle = computed<CSSProperties>(() => ({
  fontSize: Px(props.size || 48),
  lineHeight: Px(props.size || 48),
  width: Px(props.size || 48),
  height: Px(props.size || 48),
  color: props.color || "#333",
  ...(props.customStyle || {}),
}));
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "iconfont";
  /* Project id 3433285 */
  src: url("./lib/font/iconfont.woff2") format("woff2"),
    url("./lib/font/iconfont.woff") format("woff"),
    url("./lib/font/iconfont.ttf") format("truetype");
}

.s-icon {
  position: relative;
  font-family: "iconfont";
  transition: all 0.3s;
  font-style: initial;
}
</style>
