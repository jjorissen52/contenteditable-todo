import { CSS } from '@stitches/react';
import { ReactNode } from 'react';

export type StitchesProps<T extends boolean = true> = {
  css?: CSS;
  className?: string;
  children?: T extends true ? ReactNode : never;
};
