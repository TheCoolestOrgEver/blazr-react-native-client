import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, saveProfile, fetchProfile, fetchCurrentUser } from '../actions';
import { Card, CardSection, ButtonSection, Button, Spinner } from './common';
import ProfileForm from './ProfileForm';
import { View, KeyboardAvoidingView, SafeAreaView, Alert } from 'react-native';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'
import firebase from 'firebase';

class ProfileEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false, 
    }
    
  }

  componentWillMount() {
    this.props.fetchCurrentUser()
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
    const { name, age, bio, imageUri, imageURL } = this.props;
    console.log('profile form save', imageUri);
    this.setState({loading: true});
    if (name == '' || age == '' || bio == '') {
      Alert.alert(
        'Invalid form',
        'Please enter all the fields',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      this.props.saveProfile({ name, age, bio, imageUri, imageURL, usrid});
    }
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
  const { name, age, bio, imageUri, imageURL } = state.profForm;
  return { name, age, bio, imageUri, imageURL };
};

export default connect(mapStateToProps, {
  updateProfile, saveProfile, fetchProfile, fetchCurrentUser
})(ProfileEdit);
