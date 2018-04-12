import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, createProfile, fetchProfile } from '../actions';
import { Card, CardSection, Button } from './common';
import ProfileForm from './ProfileForm';
import { View } from 'react-native';

class ProfileCreate extends Component {
  onButtonPress() {
    const { name, age, bio } = this.props;
    this.props.createProfile({ name, age, bio });
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
  const { name, age, bio } = state.profForm;
  return { name, age, bio };
};

export default connect(mapStateToProps, {
  updateProfile, createProfile, fetchProfile
})(ProfileCreate);
