<template>
  <view class="s-checkbox-group" :style="checkboxGroupStyle">
    <SCheckbox
      v-model="groupValue[item.name]"
      v-for="item in props.checkOptions"
      :key="item.name"
      :name="item.name"
      :label="item.label"
      :shape="props.shape"
    />
  </view>
</template>
<script lang="ts" setup>
import { computed, CSSProperties, ref, watch } from "vue";
import SCheckbox from "./s-checkbox.vue";
import type { shape } from "sview-ui";

interface Props {
  placement?: CSSProperties["flexDirection"];
  checkOptions: { name: string; label: string; value?: boolean; disable?: boolean }[];
  shape?: shape;
}

const props = defineProps<Props>();
const checkboxGroupStyle = computed<CSSProperties>(() => ({
  flexDirection: props.placement || "row",
}));

const groupValue = ref<Record<Props["checkOptions"][0]["name"], boolean>>({});

watch(
  () => props.checkOptions,
  (val) => {
    groupValue.value = val.reduce((pre, cur) => {
      pre[cur.name] = cur.value || false;
      return pre;
    }, {});
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.s-checkbox-group {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
