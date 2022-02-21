import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  bold: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  semiBold: {
    fontSize: 15,
    fontWeight: '600',
  },
  regular: {
    fontSize: 15,
    fontWeight: '400',
  },
});

type BodyTextProps = {
  textType?: 'bold' | 'semi-bold' | 'regular';
  style?: TextStyle | TextStyle[];
};

const BodyText: FunctionComponent<BodyTextProps> = ({
  children,
  textType,
  style,
}) => {
  let textStyle: {};
  switch (textType) {
    case 'bold':
      textStyle = styles.bold;
      break;
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'semi-bold':
      textStyle = styles.semiBold;
      break;
    default:
      textStyle = styles.regular;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return <Text style={[textStyle, { ...passedStyles }]}>{children}</Text>;
};

export default BodyText;
