import { combineReducers }  from 'redux';
import * as xxxReducers from './xxx';

export default combineReducers( Object.assign(
  xxxReducers,
));
