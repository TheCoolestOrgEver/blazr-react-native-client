import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfReducer from './ProfReducer';

export default combineReducers({
  auth: AuthReducer,
  prof: ProfReducer
});