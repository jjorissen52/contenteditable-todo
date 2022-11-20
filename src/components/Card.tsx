import { styled } from '@stitches/react';

const StyledCard = styled('div', {
  padding: '$3',
  boxShadow: '0 0 2px 2px grey',
  variants: {
    border: {
      rounded: {
        borderRadius: '4px',
      },
    },
  },
  defaultVariants: {
    border: 'rounded',
  },
});

export default StyledCard;
