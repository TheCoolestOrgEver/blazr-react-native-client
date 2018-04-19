import firebase from 'firebase';
var Config = require('../../config.json')

export function getProfile() {
    const { currentUser } = firebase.auth();
    const usrid = currentUser.uid;
  
    return fetch('http://' + Config.HOST + ':8080/profile/' + usrid, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log('get profile response', JSON.stringify(response));
      //dispatch({ type: PROFILE_FETCH_SUCCESS, payload: response});
      return response;
    })
  }

export function updateLocation(latitude, longitude) {
    const { currentUser } = firebase.auth();
    const usrid = currentUser.uid;

    return fetch('http://' + Config.HOST + ':8080/location/?userID=' + usrid + '&lat=' + latitude + '&long=' + longitude, {
      method: 'PUT',
      headers: {
        Accept: 'application/json'
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log('update location response', JSON.stringify(response));
      return response;
    })
  }