export const typeofBlinkable = ['hour', 'minute'] as const;

export type BlinkableType = typeof typeofBlinkable[number];