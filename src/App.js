import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers'
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDBugnZ_UZIrLV3QNr1wWKDIm1Bx7BpbqI",
      authDomain: "blazr-32999.firebaseapp.com",
      databaseURL: "https://blazr-32999.firebaseio.com",
      projectId: "blazr-32999",
      storageBucket: "blazr-32999.appspot.com",
      messagingSenderId: "466611530510"
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
