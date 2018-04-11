import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  NAME_CHANGED,
  AGE_CHANGED,
  BIO_CHANGED,
  PROFILE_CREATE,
  PROFILE_UPDATE,
  PROFILE_FETCH_SUCCESS
} from './types';

// export const nameChanged = (text) => {
//   return {
//     type: NAME_CHANGED,
//     payload: text
//   };
// };

// export const ageChanged = (text) => {
//   return {
//     type: AGE_CHANGED,
//     payload: text
//   };
// };

// export const bioChanged = (text) => {
//   return {
//     type: BIO_CHANGED,
//     payload: text
//   };
// };

export const updateProfile = ({ prop, value }) => {
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const createProfile = ({ name, age, bio }) => {
  const { currentUser } = firebase.auth();

  return(dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/profile`)
      .push({ name, age, bio })
        .then(() => {
          dispatch({ type: PROFILE_CREATE });
          Actions.main();
        });
  };
};

export const fetchProfile = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/`)
      .on('value', snapshot => {
        dispatch({ type: PROFILE_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const saveProfile = ({ }) => {

};