import { reactive, ref, watch } from "vue";

export function useComponentsProps<P extends Record<string, any>>(props: P) {
    const componentsProps = ref()
    componentsProps.value = props

    watch(() => props.customProps, (val) => {
        if (val) {
            for (const key in val) {

                if (Object.prototype.hasOwnProperty.call(val, key)) {
                    const element = val[key];
                    if (!componentsProps.value[key]) {
                        componentsProps.value[key] = element
                    }
                }
            }
        }
    }, { immediate: true, deep: true })

    return reactive(componentsProps.value) as Mutable<P>
}