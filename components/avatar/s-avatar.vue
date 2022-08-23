<template>
  <view class="s-avatar" :style="avatarStyle">
    <s-image :src="props.src || ''" :mode="props.mode || 'scaleToFill'" class="image" />
  </view>
</template>
<script lang="ts" setup>
import { isCircle, Px } from "sview-ui";
import { computed, CSSProperties } from "vue";
import type { shape, ImageMode } from "sview-ui";

interface Props {
  /** 头像路径，如加载失败，将会显示默认头像 */
  src?: string;
  /** 头像形状 */
  shape?: shape;
  /** 头像尺寸 默认80 单位px*/
  size?: number | string;
  /** 头像图片的裁剪类型，与uni的image组件的mode参数一致，如效果达不到需求，可尝试传widthFix值 */
  mode?: ImageMode;
  /** 背景颜色，一般显示文字时用 */
  bgColor?: string;
  /** 是否使用随机背景色 */
  randomBgColor?: boolean;
  customeStyle?: CSSProperties;
  /** 兼容小程序的 v-bind 用法 */
  customProps?: Exclude<Props, "customProps">;
}
const props = defineProps<Props>();

const avatarStyle = computed<CSSProperties>(() => ({
  borderRadius: isCircle(props.shape != "square"),
  backgroundColor: props.bgColor || props.randomBgColor ? changeColor() : "transparent",
  width: Px(props.size || 80),
  height: Px(props.size || 80),
  ...(props.customeStyle || {}),
}));

/** 随机获取颜色 */
function changeColor() {
  var r = Math.round(255 * Math.random());
  var g = Math.round(255 * Math.random());
  var b = Math.round(255 * Math.random());
  var rgb = "rgb(" + r + "," + g + "," + b + ")";
  return rgb;
}
</script>
<style lang="scss" scoped>
.s-avatar {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
