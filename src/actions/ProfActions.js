import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  NAME_CHANGED,
  AGE_CHANGED,
  BIO_CHANGED,
  PROFILE_CREATE,
  PROFILE_UPDATE,
  PROFILE_SAVE,
  PROFILE_FETCH_SUCCESS,
  GET_USER
} from './types';

export const updateProfile = ({ prop, value }) => {
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const createProfile = ({ name, age, bio }) => {
  const { currentUser } = firebase.auth();
  const usrid = currentUser.uid;

  return(dispatch) => {
    firebase.database().ref(`/profiles`)
      .push({ name, age, bio, usrid })
        .then(() => {
          dispatch({ type: PROFILE_CREATE });
          Actions.main();
        });
  };
};

export const fetchProfile = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/profiles`)
      .on('value', snapshot => {
        dispatch({ type: PROFILE_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};

export const saveProfile = ({ name, age, bio, uid }) => {
  const { currentUser } = firebase.auth();
  const usrid = currentUser.uid;

  return(dispatch) => {
    firebase.database().ref(`/profiles/${uid}`)
      .set({ name, age, bio, usrid })
        .then(() => {
          dispatch({ type: PROFILE_SAVE });
          Actions.pop();
        });
  };
};

export const getUser = () => {
  const { currentUser } = firebase.auth();
  const usrid = currentUser.uid;
  
  return {
    type: GET_USER,
    payload: usrid
  };
  //  return (dispatch) => {
  //    dispatch({ type: GET_USER, payload: usrid });
  //  };
};
