import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { updateProfile } from '../actions';
import { Card, CardSection, Input } from './common';
import LinearGradient from 'react-native-linear-gradient';

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
     <View style={styles.viewStyle}>
       <LinearGradient colors={['#2E23F3', '#F52668']} 
        style={styles.backgroundStyle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
          <Text style={styles.headerStyle}>
            Edit {"\n"} 
            your info
          </Text>
          <Card>
            <CardSection>
              <Input
                label='Name'
                placeholder='First Last'
                value={this.props.name}
                onChangeText={value => this.props.updateProfile({ prop: 'name', value})}
              />
            </CardSection>
            <View style={{height: 1, backgroundColor: '#c7c7cd'}}>
            </View>
            <CardSection>
              <Input
                label='Age'
                placeholder='102'
                value={this.props.age}
                onChangeText={value => this.props.updateProfile({ prop: 'age', value})}
              />
            </CardSection>
            <View style={{height: 1, backgroundColor: '#c7c7cd'}}>
            </View>
            <CardSection>
              <Input
                label='Bio'
                placeholder='tell us about yourself'
                value={this.props.bio}
                onChangeText={value => this.props.updateProfile({ prop: 'bio', value})}
              />
            </CardSection>
          </Card>
        </LinearGradient>
      </View>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  viewStyle: {
    flex: 1,
  },
  headerStyle: {
    margin: 10,
    color: 'white',
    fontSize: 30,
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = (state) => {
  const { name, age, bio } = state.profForm;

  return { name, age, bio };
};

export default connect(mapStateToProps, {
  updateProfile
})(ProfileForm);