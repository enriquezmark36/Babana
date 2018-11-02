import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const alarmLister = createReducer([], {
  [types.ADD_ALARM](state, action) {
    // BUG: This fails if the state is not an array
    if (Array.isArray(state))
      return[...state, action.item];
    else
      return[action.item];
  },
  [types.SWITCH_ALARM](state, action) {
    for (var i = 0; i < state.length; i++) {
      if (state[i].id === action.id) {
          var copyState = [...state];
          copyState[i].switch = (copyState[i].switch === true ? false : true);
          return copyState;
      }
    }
    return state;
  },
  [types.DEL_ALARM](state, action) {
    return state.filter(elem => elem.id !== action.id);
  }
});

export const alarmCounter = createReducer(0, {
  [types.INC_ALARM_COUNT](state, action) {
    return state + 1 ;
  }
});
