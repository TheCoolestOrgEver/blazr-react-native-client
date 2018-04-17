import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, createProfile, fetchProfile } from '../actions';
import { Card, CardSection, Button } from './common';
import ProfileForm from './ProfileForm';
import { View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

class ProfileCreate extends Component {
  onButtonPress() {
    const { name, age, bio, imageUri } = this.props;
    console.log('profile form create', imageUri);
    this.props.createProfile({ name, age, bio, imageUri});
  }
  
  render() {
    const navBarHeight = isIphoneX() ? 88 : 64
    return (
      <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView 
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={navBarHeight}>
        <ProfileForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create Profile
          </Button>
        </CardSection>
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, age, bio, imageUri } = state.profForm;
  return { name, age, bio, imageUri };
};

export default connect(mapStateToProps, {
  updateProfile, createProfile, fetchProfile
})(ProfileCreate);
