import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { updateProfile, saveProfile, fetchProfile } from '../actions';
import { Button, Card, CardSection, Input } from './common';
import ProfileForm from './ProfileForm';

class ProfileEdit extends Component {
  //componentWillMount() {
    //_.each()
  //}

  // onNameChange(text) {
  //   this.props.nameChanged(text);
  // }

  // onAgeChange(text) {
  //   this.props.ageChanged(text);
  // }

  // onBioChange(text) {
  //   this.props.bioChanged(text);
  // }

  onEditProfileButtonPress() {
    const { name, age, bio } = this.props;
    this.props.saveProfile({ name, age, bio });
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
  const { name, age, bio } = state.profForm;

  return { name, age, bio };
};

export default connect(mapStateToProps, {
  saveProfile, updateProfile, fetchProfile
})(ProfileEdit);