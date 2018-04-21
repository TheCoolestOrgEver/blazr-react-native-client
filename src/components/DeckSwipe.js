import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from './common';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { Icon } from 'react-native-elements'
const window = Dimensions.get('window');
var Config = require('../../config.json')
import { Connection, Queue, Exchange } from 'react-native-rabbitmq';
import { getUser } from '../actions';

const cards1 = [
  {
    text: 'Card One',
    name: 'One'
  },
  {
    text: 'Card Two',
    name: 'Two'
  },
  {
    text: 'Card Three',
    name: 'Three'
  }
];

//const exchange;

let otherUser = 'user';

class DeckSwipe extends Component {

  componentDidMount() {

    const config = {
      host: 'localhost',
      port: 5672,
      username: 'cduica',
      password: 'password',
      virtualhost: '/'
    };

    let connection = new Connection(config);
    connection.connect();

    let connected = false;
    let queue;
    let routing_key = '';
    let exchange_name = 'cduica-world';

    connection.on('connected', (event) => {
      queue = new Queue(connection, {
        name: '',
        passive: false,
        durable: true,
        exclusive: false,
        consumer_arguments: {'x-priority': 1}
      });
      exchange = new Exchange(connection, {
        name: exchange_name,
        type: 'fanout',
        durable: true,
        autoDelete: false,
        exclusive: false,
        internal: false,
        confirm: true
      });
      queue.bind(exchange, '');
      //exchange.publish('bafftjk8t9naefk39ar2 bafftjk8t9naefk39ar1', '', properties);
      //this.publishMessage(properties);
    });

    connection.on('error', event => {
      connected = false;
      console.log(connection);
      console.log(event);
    });

  }
  
  publishMessage(properties, userA, userB) {
    console.log('publishing message');
    exchange.publish(userA + ' ' + userB, '', properties);
  }

  render() {
    const cards = this.props.data;
    console.log('here is cards');
    console.log(cards[0]);
    console.log(cards.length);

    console.log('here is cards1');
    console.log(cards1[0]);
    //cards1[0] = cards[0];

    console.log('cards', cards);
    console.log(typeof cards1);
    return (
      <Container>
        
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            looping={false}
            onSwipeLeft={() => { console.log('swipe left') }}
            onSwipeRight={() =>{ this.publishMessage(properties, this.props.uid, otherUser) }}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
              <CardItem cardBody>
                <Image style={{ height: window.height*0.55, flex: 1 }} source={{uri: item.imageURL}} />
                    {/*<Image style={{ height: 300, flex: 1 }} source={item.image} />*/}
                    <Text style={{height:0, width: 0, opacity: 0}}>
                    {otherUser= item.userID}
                    </Text>
                </CardItem>
                <CardItem style={{height: 80}}>
                  <Left>
                  {/* <Thumbnail source={{uri: item.imageURL}} /> */}
                      {/*<Thumbnail source={item.image} />*/}
                    {/* <Body> */}
                      {/*<Text>{item.text}</Text>*/}
                      <Body>
                      <Text>
                        <Text style={styles.nameStyle}>{item.name}, </Text>
                        <Text style={styles.ageStyle}>{item.age}</Text>
                      </Text>
                      <Text note>{item.bio}</Text>
                      </Body>
                    {/* </Body> */}
                  </Left>
                </CardItem>
                
              </Card>
            }
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>
            }
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", top: window.height*0.55 + 90, bottom: 0, left: 0, right: 0, justifyContent: 'center', padding: 15 }}>
          <TouchableOpacity iconLeft >
            <Icon raised onPress={() => this._deckSwiper._root.swipeLeft()} name='x'type='feather' size={50} color='#F52668' />
          </TouchableOpacity>
          <View style={{width: 10}}>
          </View>
          <TouchableOpacity >
            <Icon raised iconRight onPress={() => {this._deckSwiper._root.swipeRight()}} name='heart'type='font-awesome' size={50} color='#7cffb6' />
          </TouchableOpacity>
        </View>
      </Container>
      
    );
  }
}


const properties = {
  expiration: 10000
}

const styles = {
  nameStyle: {
    fontSize: 20,
    fontFamily: 'GothamRounded-Book',
    fontWeight: 'bold'
  }, 
  ageStyle: {
    fontSize: 20,
    fontFamily: 'GothamRounded-Book'
  }
};

// const mapStateToProps = (state) => {
//   const { name, age, bio } = state.profForm;

//   return { name, age, bio };
// };

export default (DeckSwipe);
