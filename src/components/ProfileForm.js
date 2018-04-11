import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { updateProfile } from '../actions';
import { CardSection, Input } from './common';

class ProfileForm extends Component {
  // onNameChange(text) {
  //   this.props.nameChanged(text);
  // }

  // onAgeChange(text) {
  //   this.props.ageChanged(text);
  // }

  // onBioChange(text) {
  //   this.props.bioChanged(text);
  // }

  // onCreateProfileButtonPress() {
  //   const { name, age, bio } = this.props;
  //   this.props.createProfile({ name, age, bio });
  // }

  // renderCreateProfileButton() {
  //   return (
  //     <Button onPress={this.onCreateProfileButtonPress.bind(this)}>
  //       Create Profile
  //     </Button> 
  //   )
  // }

  render () {
    return (
      <View>
        <CardSection>
          <Input
            label='Name'
            placeholder='First Last'
            value={this.props.name}
            onChangeText={value => this.props.updateProfile({ prop: 'name', value})}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Age'
            placeholder='102'
            value={this.props.age}
            onChangeText={value => this.props.updateProfile({ prop: 'age', value})}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Bio'
            placeholder='tell us about yourself'
            value={this.props.bio}
            onChangeText={value => this.props.updateProfile({ prop: 'bio', value})}
          />
        </CardSection>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { name, age, bio } = state.profForm;

  return { name, age, bio };
};

export default connect(mapStateToProps, {
  updateProfile
})(ProfileForm);