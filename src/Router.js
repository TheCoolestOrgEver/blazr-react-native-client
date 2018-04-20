import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ProfileCreate from './components/ProfileCreate';
import SwipeScreen from './components/SwipeScreen';
import ProfileEdit from './components/ProfileEdit';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene 
            key="login" hideNavBar
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
        
        <Scene key="profile" panHandlers={null}>
          <Scene
            key="profile"
            component={ProfileCreate}
            title="Profile"
            initial
          />
        </Scene>

        <Scene key="main" modal>
          <Scene
          navigationBarStyle={{ backgroundColor: '#ffffff' }}
          titleStyle={{ color: '#F52668', fontSize: 40, fontFamily: 'GothamRounded-Bold' }}
          panHandlers={null}
            key="swipeScreen"
            component={SwipeScreen}
            title="blazr"
            initial
          />
          <Scene
            key="profileEdit"
            component={ProfileEdit}
            title="Edit Profile"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
