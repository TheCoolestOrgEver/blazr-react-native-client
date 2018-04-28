import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { emailChanged, passwordChanged, registerUser } from '../actions';
import { Button, Card, CardSection, ButtonSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

class SignUpForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  
  onSignUpButtonPress() {
    const { email, password } = this.props;
    this.props.registerUser({ email, password });
  }

  renderSignUpButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onSignUpButtonPress.bind(this)}>
        Sign Up
      </Button>
    )
  }

  render () {
    const navBarHeight = isIphoneX() ? 88 : 64
    return (
    <SafeAreaView 
    style={{flex:1, backgroundColor: '#ffffff'}}
    >
    <KeyboardAvoidingView 
      style={styles.viewStyle}
      behavior="padding"
      keyboardVerticalOffset={navBarHeight}>
     <LinearGradient colors={['#2E23F3', '#F52668']} 
      style={styles.backgroundStyle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <Text style={styles.headerStyle}>
        Create {"\n"} 
        your account
      </Text>
      <CardSection>
        <Input
          label='Email'
          placeholder='email@gmail.com'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
      </CardSection>
      <View style={{height: 2, opacity: 0}}>
      </View>
      <CardSection>
        <Input
          secureTextEntry
          label='Password'
          placeholder='password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
      </CardSection>
      <View style={{height: 2, opacity: 0}}>
      </View>
      <CardSection>
        <Input
          secureTextEntry
          label='Password'
          placeholder='confirm password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
      </CardSection>
      </LinearGradient>
      <ButtonSection>
          {this.renderSignUpButton()}
      </ButtonSection>
    </KeyboardAvoidingView>
    </SafeAreaView>
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
    fontFamily: 'GothamRounded-Book',
    backgroundColor: 'transparent'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser
})(SignUpForm);
