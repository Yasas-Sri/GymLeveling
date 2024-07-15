import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

const CustomIconButton = ({icon,iconColor,size}) => (
  <IconButton
   className={` ${icon} ${iconColor} ${size}`}
   
  //  icon="bell"
  //  iconColor={'#CDCDE0'}
  //  size={20}
  />
);

export default CustomIconButton;