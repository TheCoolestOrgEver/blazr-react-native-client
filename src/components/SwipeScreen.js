import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, getUser } from '../actions';
import { Text, FlatList, Image, SafeAreaView } from 'react-native';
import SwipeScreenItem from './SwipeScreenItem';
import ProfileEditItem from './ProfileEditItem';
import DeckSwipe from './DeckSwipe';
import { CardSection, Button } from './common';
import { Container, View, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon } from 'native-base';

class SwipeScreen extends Component {
  componentWillMount() {
    this.props.fetchProfile();
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
    //const data = [];

    //const data = JSON.parse(this.props.profiles);
    //console.log(this.snapshotToArray(this.props.snapshot));
    // console.log(data);
    //console.log(this.props.profiles);
    //console.log(getUser().payload);
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
      
      <DeckSwipe data={this.props.snapshot}/>

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

export default connect(mapStateToProps, { fetchProfile, getUser })(SwipeScreen);
