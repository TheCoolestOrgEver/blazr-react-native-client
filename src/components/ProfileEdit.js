import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, saveProfile, fetchProfile } from '../actions';
import { Card, CardSection, ButtonSection, Button } from './common';
import ProfileForm from './ProfileForm';
import { View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'
import firebase from 'firebase';
import { getProfile } from './Helper.js'

class ProfileEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentWillMount() {

  }

  renderSaveButton() {
    if (this.state.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Save Changes
      </Button>
    )
  }

  onButtonPress() {
    const { currentUser } = firebase.auth();
    const usrid = currentUser.uid;
    const { name, age, bio, imageUri } = this.props;
    console.log('profile form create', imageUri);
    this.setState({loading: true});
    this.props.saveProfile({ name, age, bio, imageUri, usrid});
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
        <ButtonSection>
          {this.renderSaveButton()}
        </ButtonSection>
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
  updateProfile, saveProfile, fetchProfile
})(ProfileEdit);
