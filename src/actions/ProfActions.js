import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PROFILE_CREATE,
  PROFILE_UPDATE,
  PROFILE_SAVE,
  PROFILE_FETCH_SUCCESS,
  IMAGE_CHANGED,
  DISPLAY_IMAGE_CHANGED
} from './types';
import RNFetchBlob from 'react-native-fetch-blob'

export const updateProfile = ({ prop, value }) => {
  console.log('update form actions', value);
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const imageChanged = (imageUri) => {
  return {
    type: IMAGE_CHANGED,
    payload: imageUri
  };
};

export const displayImageChanged = (displayImage) => {
  return {
    type: DISPLAY_IMAGE_CHANGED,
    payload: displayImage
  };
};

export const createProfile = ({ name, age, bio, imageUri }) => {
  const { currentUser } = firebase.auth();
  const usrid = currentUser.uid;
  console.log('profile form actions', imageUri);
  uploadProfilePicture({ imageUri });
  return(dispatch) => {
    firebase.database().ref(`/profiles`)
      .push({ name, age, bio, usrid })
        .then(() => {
          dispatch({ type: PROFILE_CREATE });
          Actions.main();
        });
  };
};

export const uploadProfilePicture = ({ imageUri }) =>{
    
    return RNFetchBlob.fetch('POST', 'https://api.imgur.com/3/image', {
        Accept: 'application/json',
        'Content-Type': 'application/octet-stream',
        'Authorization': 'Client-ID fb450746b88443d',
      }, RNFetchBlob.wrap( imageUri )) 
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.link)
      })
      .catch((error) => {
        console.error(error);
      });
}

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
