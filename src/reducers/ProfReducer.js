import {
  PROFILE_FETCH_SUCCESS,
  MATCHES_FETCH_SUCCESS,
  GET_USER
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_FETCH_SUCCESS:
      return action.payload;
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
}
