import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { nameChanged, ageChanged, bioChanged, createProfile } from '../actions';
import { Button, Card, CardSection, Input } from './common';

class ProfileForm extends Component {
  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onAgeChange(text) {
    this.props.ageChanged(text);
  }

  onBioChange(text) {
    this.props.bioChanged(text);
  }

  onCreateProfileButtonPress() {
    const { name, age, bio } = this.props;
    this.props.createProfile({ name, age, bio });
  }

  renderCreateProfileButton() {
    return (
      <Button onPress={this.onCreateProfileButtonPress.bind(this)}>
        Create Profile
      </Button> 
    )
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            label='Name'
            placeholder='First Last'
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Age'
            placeholder='102'
            onChangeText={this.onAgeChange.bind(this)}
            value={this.props.age}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Bio'
            placeholder='tell us about yourself'
            onChangeText={this.onBioChange.bind(this)}
            value={this.props.bio}
          />
        </CardSection>

        <CardSection>
          {this.renderCreateProfileButton()}
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = ({ prof }) => {
  const { name, age, bio } = prof;

  return { name, age, bio };
};

export default connect(mapStateToProps, {
  nameChanged, ageChanged, bioChanged, createProfile
})(ProfileForm);