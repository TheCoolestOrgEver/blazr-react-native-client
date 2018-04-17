import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Button } from './common';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

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

    console.log(typeof cards);
    console.log(typeof cards1);
    return (
      <Container>
        
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards1}
            //looping={false}
            onSwipeLeft={() => {console.log("You swiped left")}}
            onSwipeRight={() => {console.log("You swiped right")}}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                  <Thumbnail source={require('./common/palmer_residence.jpg')} />
                      {/*<Thumbnail source={item.image} />*/}
                    <Body>
                      {/*<Text>{item.text}</Text>*/}
                      <Text>{item.name}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={require('./common/palmer_residence.jpg')} />
                    {/*<Image style={{ height: 300, flex: 1 }} source={item.image} />*/}
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                  {/*<Text>{item.name}</Text>*/}
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
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>Swipe Right</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { name, age, bio } = state.profForm;

//   return { name, age, bio };
// };

export default (DeckSwipe);
