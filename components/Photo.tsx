import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

//const LeftContent = (props:{size:number}) => <Avatar.Icon {...props} icon="folder" />

const Photo:React.FC<{url:string, camera:string, handleClick:any}> = ({url, camera,handleClick}:{url:string, camera:string,handleClick:()=>void}) => (
  <Card style={{backgroundColor:'#fff'}}>
    {/* <Card.Title title="Card Title" subtitle={camera}/> */}
    <Card.Content >
      {/* <Title>Card title</Title> */}
      <Paragraph style={{color:'#6200ee'}}>{camera}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: url }} />
    <Card.Actions>
      <Button onPress={handleClick} mode='contained'>more</Button>
    </Card.Actions>
  </Card>
);

export default Photo;