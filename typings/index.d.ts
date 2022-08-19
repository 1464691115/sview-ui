/// <reference types="@dcloudio/types" />

declare namespace UniApp {
    interface Uni {
    }
}

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}


declare type ImageMode =
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

declare type shape = "circle" | "square";


declare type Mutable<T> = {
    -readonly [K in keyof T]: T[K]
}