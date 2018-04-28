import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, createProfile, fetchProfile } from '../actions';
import { Card, CardSection, ButtonSection, Button, Spinner } from './common';
import ProfileForm from './ProfileForm';
import { View, KeyboardAvoidingView, SafeAreaView, Alert } from 'react-native';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

class ProfileCreate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onButtonPress() {
    const { name, age, bio, imageUri } = this.props;
    console.log('profile form create', imageUri);
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
      this.setState({loading: false});
    } else {
      this.setState({loading: true});
      this.props.createProfile({ name, age, bio, imageUri})
    }
    //this.setState({loading: false});
  }

  renderCreateButton() {
    if (this.state.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Create Profile
      </Button>
    )
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
          {this.renderCreateButton()}
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
  updateProfile, createProfile, fetchProfile
})(ProfileCreate);
