import * as React from 'react';
import { Button } from 'react-native-paper';
import {Link} from 'react-native'

const RNButton = ({mode,title,style,handlePress,color}) => (
  <Button mode={mode} className={style} onPress={handlePress} >
    {title}
  </Button>
);

export default RNButton;