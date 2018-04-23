import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Button } from './common';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { Icon } from 'react-native-elements'
const window = Dimensions.get('window');
var Config = require('../../config.json')
import { Connection, Queue, Exchange } from 'react-native-rabbitmq';
import { getUser } from '../actions';
import Modal from 'react-native-modalbox';

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

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3, 
      matchName: 'N',
      matchImageURL: ''
    };
  }

  componentDidMount() {
    //this.refs.matchModal.open()

    const config = {
      host: Config.HOST,
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
        autoDelete: true,
        exclusive: false,
        consumer_arguments: {'x-priority': 1}
      });
      exchange = new Exchange(connection, {
        name: exchange_name,
        type: 'direct',
        durable: true,
        autoDelete: false,
        exclusive: false,
        internal: false,
        confirm: true
      });
      exchange2 = new Exchange(connection, {
        name: 'cduica-hello',
        type: 'direct',
        durable: true,
        autoDelete: false,
        exclusive: false,
        internal: false,
        confirm: true
      });
      queue.bind(exchange, '');
      queue.bind(exchange2, '');
      queue.on('message', (data) => {
        message = data.message;
        user = message.split(" ");
        if(data.exchange === 'cduica-hello' && user[0] == this.props.uid){
          //console.log(data);

          //profile = users.get(user[1])
          for(i = 0; i < this.props.data.length; ++i) {
            if(this.props.data[i].userID === user[1]) {
              this.setState({matchName: this.props.data[i].name, matchImageURL: this.props.data[i].imageURL});
            }
          }

          this.refs.matchModal.open()
        }
      });
	
    });
    connection.on('error', event => {
      connected = false;
      console.log(connection);
      console.log(event);
    });

  }

  componentWillUnmount() {
    console.log('closing connection');
    connection.close();
  }
  
  publishMessage(properties, userA, userB) {
    console.log('publishing message');
    exchange.publish(userA + ' ' + userB, '', properties);
  }

  render() {
    
    let cards = this.props.data;

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
        <Modal style={[styles.modal, styles.matchModal]} ref={"matchModal"} isDisabled={this.state.isDisabled} backdrop={true}>
           <Text style={{fontSize: 70, fontFamily: 'Mission-Script', color: 'white'}}>
            It's a Match!
          </Text>
          <Text>
            <Text style={{color: 'white', fontFamily: 'GothamRounded-Book'}}>
              You matched with 
            </Text>
            <Text style={{color: 'white', fontFamily: 'GothamRounded-Book'}}>
              {' ' + this.state.matchName + '!'}
            </Text>
          </Text>
          <View style={{height: 10}}></View>
          <View style={{ flexDirection: 'row' }}>
          <Image style={{ height: 70, width: 70, borderRadius: 35, borderWidth: 1, borderColor: 'white' }} source={{uri: this.props.currentUser.imageURL}} />
          <View style={{ width: 30 }}></View>
          <Image style={{ height: 70, width: 70, borderRadius: 35, borderWidth: 1, borderColor: 'white' }} source={{uri: this.state.matchImageURL}} />
          </View>
        </Modal>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", top: window.height*0.55 + 90, bottom: 0, left: 0, right: 0, justifyContent: 'center', padding: 15 }}>
          <TouchableOpacity>
            <Icon raised iconLeft onPress={() => this._deckSwiper._root.swipeLeft()} name='x'type='feather' size={window.width/8} color='#F52668' />
          </TouchableOpacity>
          <View style={{width: 10}}>
          </View>
          <TouchableOpacity >
            <Icon raised iconRight onPress={() => {this._deckSwiper._root.swipeRight(); this.publishMessage(properties, this.props.uid, otherUser); }} name='heart'type='font-awesome' size={window.width/8} color='#7cffb6' />
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: 'white'
  },
  matchModal: {
    height: 300, 
    width: window.width - 20,
    top: window.height*0.20,
    opacity: 0.9,
    backgroundColor: 'black'
  },
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
