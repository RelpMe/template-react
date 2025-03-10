import React from 'react';
import { MotiView } from 'moti';
// @ts-ignore
import { Skeleton as MotiSkeleton } from 'moti/skeleton/react-native-linear-gradient';

import { COLORS } from '@src/constants';

export type DimensionValue = number | 'auto' | `${number}%` | null;

export interface ISkeleton {
  radius?: number;
  width: number | DimensionValue;
  height?: number;
  backgroundColor?: string;
}

const Skeleton = ({
  radius = 10,
  width,
  height = 100,
  backgroundColor = COLORS.transparent,
}: ISkeleton) => {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      animate={{ backgroundColor }}
    >
      <MotiSkeleton colorMode="light" radius={radius} width={width} height={height} />
    </MotiView>
  );
};

export default Skeleton;
