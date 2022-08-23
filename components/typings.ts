
import type { AppContext, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
}

export function withInstall<T>(main: T): SFCWithInstall<T>
export function withInstall<T, E extends Record<string, any>>(main: T, extra?: E): SFCWithInstall<T> & E
export function withInstall(main, extra?) {
    ; main.install = (app): void => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp)
        }
    }

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ; (main as any)[key] = comp
        }
    }
    return main
}