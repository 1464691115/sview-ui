import { ref, watch } from "vue";
import { deepClone } from 'sview-ui';

export function useComponentsProps<P extends Record<string, any>>(props: P) {
    const resultProps = ref<Mutable<P>>({} as any)

    watch(() => props, () => {
        const selfProps = deepClone(props)
        const val = selfProps.customProps || {}
        for (const key in val) {
            if (Object.prototype.hasOwnProperty.call(val, key)) {
                const element = val[key];
                if (!selfProps[key]) {
                    // @ts-ignore
                    selfProps[key] = element
                }
            }
        }

        resultProps.value = selfProps
    }, { deep: true, immediate: true })

    return resultProps
}