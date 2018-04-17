import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, createProfile, fetchProfile } from '../actions';
import { Card, CardSection, Button } from './common';
import ProfileForm from './ProfileForm';
import { View } from 'react-native';

class ProfileCreate extends Component {
  onButtonPress() {
    const { name, age, bio, imageUri } = this.props;
    console.log('profile form create', imageUri);
    this.props.createProfile({ name, age, bio, imageUri});
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <ProfileForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create Profile
          </Button>
        </CardSection>
      </View>
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
