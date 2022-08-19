<template>
  <view class="s-avatar" :style="avatarStyle">
    <image
      :src="avatarProps.src"
      :mode="avatarProps.mode || 'scaleToFill'"
      class="image"
    />
  </view>
</template>
<script lang="ts" setup>
import { isCircle, Px, ImageMode, shape, funcForIn } from "sview-ui";
import { computed, CSSProperties, reactive, watch } from "vue";

interface Props {
  /** 头像路径，如加载失败，将会显示默认头像 */
  src?: string;
  /** 头像形状 */
  shape?: shape;
  /** 头像尺寸 默认80 单位px*/
  size?: number;
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

const avatarProps = reactive(props);

watch(
  () => props,
  (val) => funcForIn(avatarProps, val)
);

watch(
  () => props.customProps,
  (val) => funcForIn(val, props),
  { deep: true }
);

const avatarStyle = computed<CSSProperties>(() => ({
  borderRadius: isCircle(avatarProps.shape != "square"),
  backgroundColor:
    avatarProps.bgColor || avatarProps.randomBgColor ? changeColor() : "transparent",
  width: Px(avatarProps.size || 80),
  height: Px(avatarProps.size || 80),
  ...(avatarProps.customeStyle || {}),
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
