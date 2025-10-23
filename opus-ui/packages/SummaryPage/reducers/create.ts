import { useReducer } from 'react';
import state from './state';
import reducer from './reducer';

export default () => {
  return useReducer(reducer, state);
};
