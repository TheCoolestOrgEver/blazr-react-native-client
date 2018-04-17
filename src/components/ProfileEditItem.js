import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';

class ProfileEditItem extends Component {
  onRowPress() {
    Actions.profileEdit({ profile: this.props.profile.item });
  }

  render() {
    return (
      <Button onPress={this.onRowPress.bind(this)}>
        Edit Profile
      </Button>
    );
  };
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ProfileEditItem;