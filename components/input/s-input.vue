<template>
  <view class="s-input" :class="{
    'is-disabled': inputDisabledClass,
    's-input-suffix': inputSuffixClass,
    's-input-prefix': inputPrefixClass,
  }">
    <view v-if="inputProps.textPrepend || slots.prepend" class="s-input_group-prepend s-input_border-append"
      @click.stop="(e) => emits('clickPrepend', e)">
      <slot name="prepend">
        {{ inputProps.textPrepend || "" }}
      </slot>
    </view>

    <view class="s-input_group-content" :class="{
      's-input_inner-focus': isFocus,
      's-input_inner-border-none': inputProps.inputBorder === false,
      's-input_border-prepend': borderPrependClass,
      's-input_border-append': borderAppendClass,
    }">
      <view v-if="slots.prefix || inputProps.iconPrefix" class="prefix_group">
        <slot name="prefix">
          <s-icon :icon="inputProps.iconPrefix || 'search'" size="26px" color="#999"
            @tap.stop="handlePrefixIconClick" />
        </slot>
      </view>

      <input class="s-input_inner" :value="props.modelValue" :password="inputProps.password"
        :placeholder="inputProps.placeholder || ''" :disabled="inputDisabledClass"
        :maxlength="inputProps.maxlength || -1" :minlength="inputProps.minlength || 0"
        :autocomplete="inputProps.autocomplete || 'on'" :name="inputProps.name || ''"
        :readonly="inputProps.readonly || false" :autofocus="inputProps.autofocus || false" @focus="isFocus = true"
        @blur="isFocus = false" @input="handleInput" @confirm="handleConfirm" />

      <view v-if="inputSuffixClass" class="suffix_group">
        <slot name="suffix">
          <s-icon :icon="inputProps.iconSuffix || 'close'" size="26px" color="#999" @tap.stop="handleSuffixIconClick" />
        </slot>
      </view>
    </view>

    <view v-if="inputProps.textAppend || slots.append" class="s-input_group-append s-input_border-prepend"
      @click.stop="(e) => emits('clickAppend', e)">
      <slot name="append">
        {{ inputProps.textAppend || "" }}
      </slot>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useComponentsProps } from "sview-ui/hooks/useComponentsProps";
import { computed, PropType, ref, useSlots } from "vue";
import { baseSInputProps, BaseSInputProps } from "./props";

const props = defineProps({
  ...baseSInputProps,
  customProps: Object as PropType<Omit<BaseSInputProps, "customProps">>
})

const emits = defineEmits<{
  (e: "change", val: Event);
  (e: "confirm", val: BaseSInputProps["modelValue"]);
  (e: "clickSuffix", val: Event);
  (e: "clickPrefix", val: Event);
  (e: "clickPrepend", val: Event);
  (e: "clickAppend", val: Event);
  (e: "update:modelValue", val: BaseSInputProps["modelValue"]);
}>();
const slots = useSlots();

/** input是否获取到焦点 */
const isFocus = ref(false);

const inputProps = useComponentsProps(props);

/** 禁用 */
const inputDisabledClass = computed(() => inputProps.value.disabled === true);
/** 是否使用左侧图标类（suffix */
const inputPrefixClass = computed(() => !!inputProps.value.iconPrefix || !!slots.prefix);
/** 是否使用右侧图标类（suffix */
const inputSuffixClass = computed(
  () =>
    !!inputProps.value.iconSuffix ||
    (inputProps.value.clearable && props.modelValue!?.toString().length > 0) ||
    !!slots.suffix
);
/** input左上下边框圆角是否为0 */
const borderPrependClass = computed(() => slots.prepend || inputProps.value.textPrepend);
/** input右上下边框圆角是否为0 */
const borderAppendClass = computed(() => slots.append || inputProps.value.textAppend);

function handleInput(e) {
  const event = e?.detail?.value || e?.target?.value;
  emits("change", e);
  emits("update:modelValue", event);
}

function handleConfirm() {
  const event = props.modelValue || "";
  emits("confirm", event);
}

function handleSuffixIconClick(e) {
  /** 如果有后置图标 */
  if (inputProps.value.iconSuffix) emits("clickSuffix", e);
  else if (inputProps.value.clearable) emits("update:modelValue", "");
}

function handlePrefixIconClick(e) {
  /** 如果有前置图标 */
  if (inputProps.value.iconSuffix) emits("clickPrefix", e);
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

    &.s-input_inner-border-none {
      border-width: 0;
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
    transition: background 0.2s;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    width: 6px;
    background: #b5bece;
  }

  &.is-disabled {
    cursor: not-allowed;

    .s-input_inner {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }

    ::v-deep .uni-input-input:disabled {
      cursor: not-allowed;
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
    cursor: pointer;
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
    cursor: pointer;
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
