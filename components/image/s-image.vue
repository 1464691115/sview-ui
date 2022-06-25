<template>
  <view class="s-image" :style="props.customStyle || {}">
    <image :src="url" :mode="props.mode" :lazyLoad="props.fadeShow" :fadeShow="props.fadeShow" :webp="props.webp"
      :showMenuByLongPress="props.showMenuByLongPress" :draggable="props.draggable" style="width: 100%; height: 100%"
      @load="(e: any) => emits('load', e)" @error="(e: any) => emits('error', e)" @click="handleTapImg" />
  </view>
</template>

<script lang="ts" setup>
import type { ImageMode } from "sview-ui";
import { computed, CSSProperties } from "vue";

interface Props {
  /** 		图片资源地址	 */
  src: string;
  /** 	'scaleToFill'	图片裁剪、缩放的模式	 */
  mode?: ImageMode;
  /** 	false	图片懒加载。只针对page与scrollView下的image有效	微信小程序、百度小程序、字节跳动小程序、飞书小程序 */
  lazyLoad?: boolean;
  /** 	true	图片显示动画效果	仅AppNvue 2.3.4+ Android有效 */
  fadeShow?: boolean;
  /** 	false	默认不解析 webP 格式，只支持网络资源	微信小程序2.9.0 */
  webp?: boolean;
  /** 	false	开启长按图片显示识别小程序码菜单	微信小程序2.7.0 */
  showMenuByLongPress?: boolean;
  /** 	true	是否能拖动图片	H5 3.1.1+、App（iOS15+） */
  draggable?: boolean;
  /** 自定义样式 */
  customStyle?: CSSProperties;
  /** 是否能预览图片 */
  isPreview?: boolean
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "load", img: tinyapp.IBaseEvent): void;
  (e: "error", img: tinyapp.IBaseEvent): void;
}>();

const url = computed(() => props.src.indexOf('@/') == 0 ? props.src.split('@')[1] : props.src)

function handleTapImg() {
  if (props.isPreview === true) {
    uni.previewImage({
      current: 0,
      urls: [props.src]
    })
  }
}
</script>

<style scoped>
.s-image {
  width: 100%;
  height: 100%;
}
</style>
