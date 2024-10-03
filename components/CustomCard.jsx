import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';



// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


const CustomCard = ({containerStyles,title,color,style,content}) => (
  <Card className={`${containerStyles} ${color} ` }>
    <Card.Title  title= {title}  titleStyle={{ color: 'white' }}  />
    <Card.Content>
      <Text variant="titleLarge" className="text-white"></Text>
      <Text variant="bodyMedium"></Text>
    </Card.Content>
    {/* <Card.Cover source={{ uri:  }} /> */}
    {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
  </Card>
);

export default CustomCard;