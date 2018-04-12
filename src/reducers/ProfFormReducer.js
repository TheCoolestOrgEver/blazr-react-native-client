import {
  NAME_CHANGED,
  AGE_CHANGED,
  BIO_CHANGED,
  PROFILE_UPDATE,
  PROFILE_SAVE,
  PROFILE_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  age: '',
  bio: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PROFILE_CREATE:
      return INITIAL_STATE;
    case PROFILE_SAVE:
      return INITIAL_STATE;
    default:
      return state;
  }
};