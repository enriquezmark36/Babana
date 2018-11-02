import { combineReducers }  from 'redux';
import * as AlarmReducers from './alarm';

export default combineReducers( Object.assign(
  AlarmReducers,
));
