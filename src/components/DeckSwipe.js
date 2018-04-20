import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from './common';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { Icon } from 'react-native-elements'
const window = Dimensions.get('window');

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

class DeckSwipe extends Component {
  
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
            onSwipeLeft={() => {console.log("You swiped left")}}
            onSwipeRight={() => {console.log("You swiped right")}}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
              <CardItem cardBody>
                <Image style={{ height: window.height*0.55, flex: 1 }} source={{uri: item.imageURL}} />
                    {/*<Image style={{ height: 300, flex: 1 }} source={item.image} />*/}
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
