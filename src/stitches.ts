import { createStitches, globalCss } from '@stitches/react';

export const { styled, css } = createStitches({
  theme: {
    colors: {
      gray500: 'hsl(206,10%,76%)',
      blue500: 'hsl(206,100%,50%)',
      purple500: 'hsl(252,78%,60%)',
      green500: 'hsl(148,60%,60%)',
      red500: 'hsl(352,100%,62%)',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    fontSizes: {
      1: '0.75rem',
      2: '0.8rem',
      3: '0.9rem',
      4: '1rem',
      small: '0.75rem',
      medium: '1rem',
    },
    fonts: {
      untitled: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
});

export const globalStyles = globalCss({
  '*': {
    mozBoxSizing: 'border-box',
    webkitBoxSizing: 'border-box',
    msBoxSizing: 'border-box',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  '.hidden': {
    display: 'none',
  },
});
