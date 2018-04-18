import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { updateProfile, saveProfile, fetchProfile } from '../actions';
import { Button, Card, CardSection, Input } from './common';
import ProfileForm from './ProfileForm';

class ProfileEdit extends Component {
  componentWillMount() {
    _.each(this.props.profile, (value, prop) => {
      this.props.updateProfile({ prop, value })
    });
  }

  onEditProfileButtonPress() {
    const { name, age, bio, imageUri } = this.props;
    this.props.saveProfile({ name, age, bio, imageUri, uid: this.props.profile.uid });
  }

  renderEditProfileButton() {
    return (
      <Button onPress={this.onEditProfileButtonPress.bind(this)}>
        Save Changes
      </Button> 
    )
  }

  render () {
    return (
      <Card>
        <ProfileForm {...this.props} />
        <CardSection>
          {this.renderEditProfileButton()}
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { name, age, bio, imageUri } = state.profForm;

  return { name, age, bio, imageUri };
};

export default connect(mapStateToProps, {
  saveProfile, updateProfile, fetchProfile
})(ProfileEdit);