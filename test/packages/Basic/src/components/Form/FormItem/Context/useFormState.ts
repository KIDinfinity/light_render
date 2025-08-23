import { useReducer } from 'react';
import reducer from './reducer';
import initialState from './state';

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch }
}
