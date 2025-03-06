import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Text, { IText } from '../Text';

import { Container } from '@src/components/atoms/TypeWriter/style.ts';

interface ITextProps extends Omit<IText, 'children'> {}

export interface TypewriterProps {
  textArray: string[];
  speed?: number;
  loop?: boolean;
  hideCursorWhenFinished?: boolean;
  delay?: number;
  textProps?: ITextProps;
  cursorProps?: ITextProps;
}

const DEFAULT_SPEED = 300;
const DEFAULT_DELAY = 40;

const TypeWriter: React.FC<TypewriterProps> = ({
  textArray,
  speed = DEFAULT_SPEED,
  loop = false,
  hideCursorWhenFinished = false,
  delay = DEFAULT_DELAY,
  textProps = {},
  cursorProps = {},
}) => {
  const [stringIndex, setStringIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [hideWhenFinished, setHideWhenFinished] = useState<boolean>(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 2,
          useNativeDriver: true,
        }),
        Animated.delay(300),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 2,
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ]),
    ).start();
  }, [opacityValue]);

  useEffect(() => {
    setTimeout(() => {
      if (textIndex < textArray[stringIndex].length) {
        setTextIndex(textIndex + 1);
      } else {
        if (stringIndex < textArray.length - 1) {
          setTimeout(() => {
            setTextIndex(0);
            setStringIndex(stringIndex + 1);
          }, delay);
        } else {
          if (loop) {
            setTimeout(() => {
              setTextIndex(0);
              setStringIndex(0);
            }, delay);
          } else {
            if (hideCursorWhenFinished) {
              setHideWhenFinished(true);
            }
          }
        }
      }
    }, speed);
  });

  return (
    <Container>
      <Text {...textProps}>{textArray[stringIndex].substring(0, textIndex)}</Text>
      <Animated.View style={{ opacity: opacityValue }}>
        {!hideWhenFinished && <Text {...cursorProps}>▎</Text>}
      </Animated.View>
    </Container>
  );
};

export default TypeWriter;
