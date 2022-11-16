import Checkbox from './s-checkbox.vue'
import CheckboxGroup from './s-checkbox-group.vue'

export const SCheckbox = Checkbox
export const SCheckboxGroup = CheckboxGroup

SCheckbox.SCheckboxGroup = SCheckboxGroup
export default SCheckbox as typeof SCheckbox & { SCheckboxGroup: typeof SCheckboxGroup }

export * from './s-checkbox.vue'
export * from './s-checkbox-group.vue'