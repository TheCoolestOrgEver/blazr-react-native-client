import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SwipeScreen from './components/SwipeScreen';
import SignUpForm from './components/SignUpForm';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene 
            key="login" 
            component={LoginForm} 
            title="Login" 
            initial 
          />
          <Scene
            key="signup"
            component={SignUpForm}
            title="Sign Up"
          />
        </Scene>
        
        <Scene key="main">
          <Scene
            rightTitle="Edit"
            key="swipeScreen"
            component={SwipeScreen}
            title="SwipeScreen"
            initial
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
