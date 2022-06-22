// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
    type GlobalComponentsType<T = typeof import('../components')> = {
        [P in keyof T]: T[P]
    }

    // GlobalComponents for Volar
    export interface GlobalComponents extends GlobalComponentsType {
    }

}

export { }