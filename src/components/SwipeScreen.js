import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, getUser, saveProfile } from '../actions';
import { Text, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import SwipeScreenItem from './SwipeScreenItem';
import MatchListItem from './MatchListItem';
import DeckSwipe from './DeckSwipe';
import { CardSection, Button } from './common';
import { Container, View, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import { getProfile, updateLocation } from './Helper.js'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

let currentUser = {};
class SwipeScreen extends Component {

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  componentWillMount() {
    Actions.refresh({ left: this._renderLeftButton, right: this._renderRightButton });
  }

  _renderRightButton = () => {
    return(
        <TouchableOpacity style={{paddingRight: 15, paddingBottom: 10}} onPress={() => this._handleChatIconTouch() } >
            <Icon name='sc-telegram'type='evilicon' size={40} color='#a8a8a8' />
        </TouchableOpacity>
    );
  };

  _handleChatIconTouch = () => {
      console.log('Touched!');
      //Actions.profileEdit()
      Actions.matches();
  }

  _renderLeftButton = () => {
    return(
        <TouchableOpacity style={{paddingLeft: 20, paddingBottom: 10}} onPress={() => this._handleEditIconTouch() } >
            <Icon name='md-settings'type='ionicon' size={30} color='#a8a8a8' />
        </TouchableOpacity>
    );
  };

  _handleEditIconTouch = () => {
      console.log('Touched!');
      Actions.profileEdit()
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: this.toRadians(position.coords.latitude),
          longitude: this.toRadians(position.coords.longitude),
          error: null,
        });
        getProfile().then((response) => {
          console.log('this is the response from get profile', response.age)
          updateLocation( this.state.latitude, this.state.longitude )
          .then((response) => {
            return this.props.fetchProfile(response.location.Lat, response.location.Long);
          });
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  snapshotToArray(snapshot) {
    const returnArr = [];
    try {
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot;
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr[0];
    } catch (error) {
      return error;
    }
    
};

  renderRow(profile) {
    if (profile.item.usrid != getUser().payload) {
      return <SwipeScreenItem profile={profile} />;
    }
  }

  renderUserRow(profile) {
    if (profile.item.usrid === getUser().payload) {
      return <MatchListItem profile={profile} />;
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
    //const data = [];

    //const data = JSON.parse(this.props.profiles);
    //console.log(this.snapshotToArray(this.props.snapshot));
    // console.log(data);
    //console.log(this.props.profiles);
    //console.log(getUser().payload);
    index = -1;
    for( i = 0; i < this.props.snapshot.length; ++i) {
      if(this.props.snapshot[i].userID === usrid) {
        index = i;
      }
    }

    if(index > -1) {
      currentUser = this.props.snapshot[index];
      this.props.snapshot.splice(index, 1);
    }
    return (
      // 1st flist edits user
      // 2nd displays all other profiles
      
      <SafeAreaView>
      {/*}
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
      */}

      <View style={{flex: 1}}>
        <DeckSwipe uid={usrid} data={this.props.snapshot} currentUser={currentUser}/>
      </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const snapshot = state.prof;
  // const arr = [];
  // //console.log(state.prof);
  // const profiles = _.map(state.prof, (val, uid) => {
  //   arr.push(val);
  //   return { ...val, uid };
  // });

  //const jProf = JSON.parse(profiles);
  //console.log(jProf);
  // console.log(snapshot);
  // console.log(profiles);
  // console.log('this is the array!!!!!!!');
  // console.log(arr);

  return { snapshot };
};

export default connect(mapStateToProps, { fetchProfile, getUser, saveProfile })(SwipeScreen);
