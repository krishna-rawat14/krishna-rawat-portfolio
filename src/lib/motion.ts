import type { CSSProperties } from 'react';

export const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Set a numeric CSS custom property (used for staggered animations). */
export const cssVar = (name: string, value: number) => ({ [name]: value }) as CSSProperties;
