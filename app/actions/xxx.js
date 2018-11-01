import * as types from './types';

export function addThat() {
  return {
      type: types.ADD_THAT,
  }
}

export function insertAlarm(alarm) {
  return (dispatch, getState) => {
      console.log('action: insert alarm: ...');
      dispatch(addAlarm({item: alarm}));
      dispatch(incAlarmCounter());
  }
}

export function addAlarm( {item} ) {
  console.log('action: test');
  return {
      type: types.ADD_ALARM,
      item
  }
}

export function removeAlarm(id) {
  return {
      type: types.DEL_ALARM,
      id
  }
}

export function toggleAlarm(id) {
  return {
      type: types.SWITCH_ALARM,
      id
  }
}

export function incAlarmCounter() {
  return {
      type: types.INC_ALARM_COUNT
  }
}
