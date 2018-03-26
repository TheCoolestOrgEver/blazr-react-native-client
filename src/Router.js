import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ProfileForm from './components/ProfileForm';
import SwipeScreen from './components/SwipeScreen';

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
        
        <Scene key="profile">
          <Scene
            rightTitle="Edit"
            key="profile"
            component={ProfileForm}
            title="Profile"
            initial
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
