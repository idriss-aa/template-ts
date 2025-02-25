export const typeofBlinkable = ['minute', 'hour'] as const;

export type BlinkableType = typeof typeofBlinkable[number];