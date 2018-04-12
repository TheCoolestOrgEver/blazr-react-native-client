import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, getUser } from '../actions';
import { Text, FlatList, Image } from 'react-native';
import SwipeScreenItem from './SwipeScreenItem';
import ProfileEditItem from './ProfileEditItem';
import { CardSection, Button } from './common';
import { Container, View, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon } from 'native-base';

class SwipeScreen extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  renderRow(profile) {
    if (profile.item.usrid != getUser().payload) {
      return <SwipeScreenItem profile={profile} />;
    }
  }

  renderUserRow(profile) {
    if (profile.item.usrid === getUser().payload) {
      return <ProfileEditItem profile={profile} />;
    }
  }

  onEditProfileButtonPress() {
    console.log(this.props);
    console.log(getUser().payload);
  }

  renderEditProfileButton() {
    return (
      <Button onPress={this.onEditProfileButtonPress.bind(this)}>
        Edit Profile
      </Button>
    )
  }

  render () {
    const usrid = getUser().payload;
    return (
      // 1st flist edits user
      // 2nd displays all other profiles
      <View>
        <FlatList
          data={this.props.profiles}
          renderItem={this.renderUserRow}
          keyExtractor={profile => profile.uid}
        />

        <FlatList
          data={this.props.profiles}
          renderItem={this.renderRow}
          keyExtractor={profile => profile.uid}
        />
        {/* */}
        <Container>
          <Header />
          <View>
            <DeckSwiper
              ref={(c) => this._deckSwiper = c}
              dataSource={this.props.profiles}
              renderEmpty={() =>
                <View style={{ alignSelf: 'center' }}>
                  <Text>Over</Text>
                </View>
              }
              renderItem={item =>
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Left>
                    <Thumbnail source={require('./common/palmer_residence.jpg')} />
                      {/*<Thumbnail source={item.image} />*/}
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>Native Base</Text>
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
                  </CardItem>
                </Card>
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
        {/* */}
        </View>
    );
  }
}

const mapStateToProps = state => {
  const profiles = _.map(state.prof, (val, uid) => {
    return { ...val, uid };
  }); 

  return { profiles };
};

export default connect(mapStateToProps, { fetchProfile, getUser })(SwipeScreen);
