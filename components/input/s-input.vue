<template>
  <view
    class="s-input"
    :class="{
      'is-disabled': inputDisabledClass,
      's-input-suffix': inputSuffixClass,
      's-input-prefix': inputPrefixClass,
    }"
  >
    <view
      v-if="props.textPrepend || slots.prepend"
      class="s-input_group-prepend s-input_border-append"
      @click.stop="(e) => emits('clickPrepend', e)"
    >
      <slot name="prepend">
        {{ props.textPrepend || "" }}
      </slot>
    </view>

    <view
      class="s-input_group-content"
      :class="{
        's-input_inner-focus': isFocus,
        's-input_border-prepend': borderPrependClass,
        's-input_border-append': borderAppendClass,
      }"
    >
      <view v-if="slots.prefix || props.iconPrefix" class="prefix_group">
        <slot name="prefix">
          <s-icon
            :icon="props.iconPrefix || 'search'"
            size="26px"
            color="#999"
            @tap="handlePrefixIconClick"
          />
        </slot>
      </view>

      <input
        class="s-input_inner"
        :value="props.modelValue"
        :placeholder="props.placeholder || ''"
        :disabled="inputDisabledClass"
        :maxlength="props.maxlength || -1"
        :minlength="props.minlength || 0"
        :autocomplete="props.autocomplete || 'on'"
        :name="props.name || ''"
        :readonly="props.readonly || false"
        :autofocus="props.autofocus || false"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @input="hanldeInput"
      />

      <view v-if="inputSuffixClass" class="suffix_group">
        <slot name="suffix">
          <s-icon
            :icon="props.iconSuffix || 'close'"
            size="26px"
            color="#999"
            @tap="handleSuffixIconClick"
          />
        </slot>
      </view>
    </view>

    <view
      v-if="props.textAppend || slots.append"
      class="s-input_group-append s-input_border-prepend"
      @click.stop="(e) => emits('clickAppend', e)"
    >
      <slot name="append">
        {{ props.textAppend || "" }}
      </slot>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import { ICON_KEY } from "../icon/enums";

interface Props {
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 默认为false */
  disabled?: boolean;
  /** 是否显示清空按钮 默认为false */
  clearable?: boolean;
  /** 前置图标 */
  iconPrefix?: keyof typeof ICON_KEY;
  /** 后置图标 */
  iconSuffix?: keyof typeof ICON_KEY;
  /** 前置内容(可配置插槽) */
  textPrepend?: string;
  /** 后置内容(可配置插槽) */
  textAppend?: string;
  /** 绑定的值 */
  modelValue?: string;

  //TODO 原生属性
  maxlength?: number;
  minlength?: number;
  autocomplete?: "on" | "off";
  name?: string;
  readonly?: boolean;
  autofocus?: boolean;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "change", val: Event);
  (e: "clickSuffix", val: Event);
  (e: "clickPrefix", val: Event);
  (e: "clickPrepend", val: Event);
  (e: "clickAppend", val: Event);
  (e: "update:modelValue", val: string);
}>();
const slots = useSlots();

/** input是否获取到焦点 */
const isFocus = ref(false);

/** 禁用 */
const inputDisabledClass = computed(() => props.disabled === true);
/** 是否使用左侧图标类（suffix */
const inputPrefixClass = computed(() => !!props.iconPrefix || !!slots.prefix);
/** 是否使用右侧图标类（suffix */
const inputSuffixClass = computed(
  () =>
    !!props.iconSuffix ||
    (props.clearable && props.modelValue!?.length > 0) ||
    !!slots.suffix
);
/** input左上下边框圆角是否为0 */
const borderPrependClass = computed(() => slots.prepend || props.textPrepend);
/** input右上下边框圆角是否为0 */
const borderAppendClass = computed(() => slots.append || props.textAppend);

function hanldeInput(e) {
  const event = (e as any)?.target.value;
  emits("change", e);
  emits("update:modelValue", event);
}

function handleSuffixIconClick(e) {
  /** 如果有后置图标 */
  if (props.iconSuffix) emits("clickSuffix", e);
  else if (props.clearable) emits("update:modelValue", "");
}

function handlePrefixIconClick(e) {
  /** 如果有前置图标 */
  if (props.iconSuffix) emits("clickPrefix", e);
}
</script>
<style lang="scss" scoped>
.s-input {
  $INPUTHEIGHT: 40px;

  position: relative;
  width: 100%;
  font-size: 14px;
  display: flex;

  .s-input_group-content {
    position: relative;
    width: auto;
    height: $INPUTHEIGHT;
    flex: 1;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.s-input_inner-focus {
      border-color: $primary;
    }
  }

  .s-input_inner {
    padding: 0 15px;
    width: 100%;
    height: 100%;
    line-height: 100%;
    color: #333;
    border: none;
    box-sizing: border-box;
    outline: none;
    font-size: 14px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b5bece;
  }

  &.is-disabled {
    .s-input_inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
    }
  }

  &.s-input-suffix {
    .s-input_inner {
      padding-right: 30px;
    }
  }
  &.s-input-prefix {
    .s-input_inner {
      padding-left: 30px;
    }
  }

  .prefix_group,
  .suffix_group {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    display: flex;
    justify-content: center;
  }

  .prefix_group {
    left: 0;
  }
  .suffix_group {
    right: 0;
  }

  .s-input_group-prepend,
  .s-input_group-append {
    width: auto;
    height: $INPUTHEIGHT;
    background-color: #f5f7fa;
    color: #909399;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 20px;
    white-space: nowrap;
    box-sizing: border-box;
    line-height: calc($INPUTHEIGHT - 2px);
    text-align: center;
  }

  .s-input_border-prepend {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &.s-input_group-append {
      border-left: 0;
    }
  }

  .s-input_border-append {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &.s-input_group-prepend {
      border-right: 0;
    }
  }
}
</style>
