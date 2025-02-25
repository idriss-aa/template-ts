/**
 * Enum for common colors.
 * @enum {{class: string}}
 */
export const EnumColorWatch = {
    WHITE :   { class: "timer-white"},
    YELLOW :  { class: "timer-yellow"}
} as const;

export type ColorWatchType = keyof typeof EnumColorWatch

export type ColorWatchClassType = typeof EnumColorWatch[keyof typeof EnumColorWatch]["class"]