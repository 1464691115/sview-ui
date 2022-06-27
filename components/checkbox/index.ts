import { withInstall } from '../typings'
import Checkbox from './s-checkbox.vue'
import CheckboxGroup from './s-checkbox-group.vue'

export const SCheckbox = withInstall(Checkbox)
export const SCheckboxGroup = withInstall(CheckboxGroup)

SCheckbox.SCheckboxGroup = SCheckboxGroup
export default SCheckbox as typeof SCheckbox & { SCheckboxGroup: typeof SCheckboxGroup }

export * from './s-checkbox.vue'
export * from './s-checkbox-group.vue'