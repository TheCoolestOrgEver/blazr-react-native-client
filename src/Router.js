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
        
        <Scene key="profile">
          <Scene
            key="profile"
            component={ProfileCreate}
            title="Profile"
            initial
          />
        </Scene>

        <Scene key="main">
          <Scene
            //rightTitle="Edit Profile"
            //onRight={() => Actions.profileEdit()}
            key="swipeScreen" hideNavBar
            component={SwipeScreen}
            title="SwipeScreen"
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
