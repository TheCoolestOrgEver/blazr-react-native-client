import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PROFILE_CREATE,
  PROFILE_UPDATE,
  PROFILE_SAVE,
  PROFILE_FETCH_SUCCESS,
  IMAGE_CHANGED,
  DISPLAY_IMAGE_CHANGED,
  GET_USER
} from './types';
import RNFetchBlob from 'react-native-fetch-blob'
var Config = require('../../config.json')

export const updateProfile = ({ prop, value }) => {
  console.log('update form actions', value);
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const imageChanged = (imageData) => {
  return {
    type: IMAGE_CHANGED,
    payload: imageData
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

  return(dispatch) => {
    uploadProfilePicture({ imageUri }).then((imgurURL) => { 
      firebase.database().ref(`/profiles`)
      .push({ name, age, bio, usrid, imgurURL })
        .then(() => {
          dispatch({ type: PROFILE_CREATE });
          Actions.main();
      })
    });
  };
};

export const uploadProfilePicture = ({ imageUri }) =>{
    
    return RNFetchBlob.fetch('POST', 'https://api.imgur.com/3/image', {
        Accept: 'application/json',
        'Content-Type': 'application/octet-stream',
        'Authorization': 'Client-ID ' + Config.IMGUR_CLIENT_ID,
      }, RNFetchBlob.wrap( imageUri )) 
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.link)
        return response.data.link;
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

export const saveProfile = ({ name, age, bio, imageUri, uid }) => {
  const { currentUser } = firebase.auth();
  const usrid = currentUser.uid;

  return(dispatch) => {
    uploadProfilePicture({ imageUri }).then((imgurURL) => {
      firebase.database().ref(`/profiles/${uid}`)
      .set({ name, age, bio, imgurURL, usrid })
        .then(() => {
          dispatch({ type: PROFILE_SAVE });
          Actions.pop();
        })
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
