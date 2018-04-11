import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfFormReducer from './ProfFormReducer';
import ProfReducer from './ProfReducer';

export default combineReducers({
  auth: AuthReducer,
  profForm: ProfFormReducer,
  prof: ProfReducer
});