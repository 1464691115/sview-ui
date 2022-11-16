import { ExtractPropTypes, PropType } from 'vue';
import { ICON_KEY } from '../icon/enums';

export const baseSInputProps = {
  /** 前置图标 */
  iconPrefix: { type: String as PropType<keyof typeof ICON_KEY & string> },
  /** 后置图标 */
  iconSuffix: { type: String as PropType<keyof typeof ICON_KEY & string> },
  /** 占位符 */
  placeholder: { type: String },
  /** 是否禁用 默认为false */
  disabled: { type: Boolean, default: false },
  /** 是否密码类型 */
  password: { type: Boolean },
  /** 是否显示清空按钮 默认为false */
  clearable: { type: Boolean, default: false },
  /** 是否显示边框，默认显示 */
  inputBorder: { type: Boolean },

  /** 前置内容(可配置插槽) */
  textPrepend: { type: String },
  /** 后置内容(可配置插槽) */
  textAppend: { type: String },
  /** 绑定的值 */
  modelValue: { type: [String, Number] },

  //TODO 原生属性
  maxlength: Number,
  minlength: Number,
  autocomplete: String as PropType<'on' | 'off'>,
  name: String,
  readonly: Boolean,
  autofocus: Boolean,
}



export type BaseSInputProps = ExtractPropTypes<typeof baseSInputProps>
