import {
  NAME_CHANGED,
  AGE_CHANGED,
  BIO_CHANGED,
  PROFILE_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  age: '',
  bio: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case AGE_CHANGED:
      return { ...state, age: action.payload };
    case BIO_CHANGED:
      return { ...state, bio: action.payload };
    case PROFILE_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};