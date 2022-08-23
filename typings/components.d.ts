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

export type ImageMode =
    | "scaleToFill"
    | "aspectFit"
    | "aspectFill"
    | "widthFix"
    | "heightFix"
    | "top"
    | "bottom"
    | "center"
    | "left"
    | "right"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right"

export type shape = "circle" | "square";

export { }