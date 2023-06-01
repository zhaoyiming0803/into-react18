```ts
export type HookFlags = number;

export const NoFlags = /*   */ 0b0000;

// Represents whether effect should fire.
export const HasEffect = /* */ 0b0001;

// Represents the phase in which the effect (not the clean-up) fires.
export const Insertion = /* */ 0b0010;
export const Layout = /*    */ 0b0100;
export const Passive = /*   */ 0b1000;

```