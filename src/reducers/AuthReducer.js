import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL, 
  LOGIN_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER
} from '../actions/types';

const INITIAL_STATE = { 
  email: '', 
  password: '',
  user: null,
  error: '',
  loading: false 
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      // makes new object using existing state and overrides email property
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      // get state, reset to initial, add the user (this is so the email/password doesn't persist)
      return { ...state, ...INITIAL_STATE, user: action.payload};
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      // get state, reset to initial, add the user (this is so the email/password doesn't persist)
      return { ...state, ...INITIAL_STATE, user: action.payload};
    case REGISTER_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    default:
      return state;
  }
};