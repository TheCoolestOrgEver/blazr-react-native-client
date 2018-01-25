import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDBugnZ_UZIrLV3QNr1wWKDIm1Bx7BpbqI",
      authDomain: "blazr-32999.firebaseapp.com",
      databaseURL: "https://blazr-32999.firebaseio.com",
      projectId: "blazr-32999",
      storageBucket: "blazr-32999.appspot.com",
      messagingSenderId: "466611530510"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{justifyContent: 'center', alignSelf: 'center'}}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="blazr" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
