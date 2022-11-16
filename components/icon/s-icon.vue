<template>
  <i class="s-icon" :style="iconStyle" v-html="ICON_KEY?.[props.icon || ''] || props.icon" />
</template>
<script lang="ts" setup>
import { computed, CSSProperties, PropType } from 'vue';
import { ICON_KEY } from './enums';
import { Px } from 'sview-ui';

const props = defineProps({
  icon: { type: String as PropType<keyof typeof ICON_KEY & string> },
  size: { type: [String, Number] as PropType<string | number>, default: 48 },
  color: { type: String as PropType<string>, default: '#333' },
  customStyle: { type: Object as PropType<CSSProperties> },
});
const iconStyle = computed<CSSProperties>(() => ({
  fontSize: Px(props.size),
  lineHeight: Px(props.size),
  width: Px(props.size),
  height: Px(props.size),
  color: props.color || '#333',
  ...(props.customStyle || {}),
}));
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';
  /* Project id 3433285 */
  src: url('./lib/font/iconfont.woff2') format('woff2'),
    url('./lib/font/iconfont.woff') format('woff'),
    url('./lib/font/iconfont.ttf') format('truetype');
}

.s-icon {
  position: relative;
  font-family: 'iconfont';
  transition: all 0.3s;
  font-style: initial;
}
</style>
