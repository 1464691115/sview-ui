import { computed, unref } from "vue";
import { deepClone } from 'sview-ui';

export function useComponentsProps<P extends Record<string, any>>(props: P) {

    return unref(computed(() => {
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
        return selfProps
    })) as unknown as Mutable<P>
}