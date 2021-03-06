import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { emailChanged, passwordChanged, loginUser, signUpRedirect } from '../actions';
import { Button, Card, CardSection, ButtonSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onSignUpButtonPress() {
    this.props.signUpRedirect();
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  renderSignUpButton() {
    return (
      <Button onPress={this.onSignUpButtonPress.bind(this)}>
        Sign Up
      </Button>
    )
  }

  render() {
    const bottomPadding = isIphoneX() ? (
      <View style={{height: 35, backgroundColor: '#ffffff'}}>
      </View>
    ) : (
      <View></View>
    );
    return (
    <View style={{flex: 1}}>
    <KeyboardAvoidingView
    style={styles.viewStyle}
    behavior="padding">
    <LinearGradient colors={['#F52668', '#FD8A49']} 
    style={styles.backgroundStyle}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}>
      <Text style={styles.headerStyle}>
        Log into {"\n"} 
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
    </LinearGradient>
    <ButtonSection >
        {this.renderLoginButton()}
    </ButtonSection>
      <View style={{height: 1}}>
      </View>
      <ButtonSection>
        {this.renderSignUpButton()}
      </ButtonSection>
    </KeyboardAvoidingView>
    {bottomPadding}
    </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
  },
  viewStyle: {
    flex: 1,
  },
  headerStyle: {
    margin: 15,
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
  emailChanged, passwordChanged, loginUser, signUpRedirect
})(LoginForm);
