import {
  IMAGE_CHANGED,
  DISPLAY_IMAGE_CHANGED,
  PROFILE_UPDATE,
  PROFILE_SAVE,
  PROFILE_CREATE,
  PROFILE_FETCHED
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  age: '',
  bio: '', 
  imageURL: 'https://i.imgur.com/U46AcUU.jpg',
  imageUri: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISPLAY_IMAGE_CHANGED:
      return { ...state, imageURL: action.payload };
    case IMAGE_CHANGED:
      return { ...state, imageUri: action.payload };
    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PROFILE_CREATE:
      return state;
    case PROFILE_FETCHED:
      return action.payload;
    case PROFILE_SAVE:
      return state;
    default:
      return state;
  }
};