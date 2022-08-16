/// <reference path ="./typings/index.d.ts"/>
/// <reference path ="./typings/components.d.ts"/>

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

export * from './utils' 
