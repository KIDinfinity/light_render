import { useReducer } from 'react';
import reducers from './reducers';

export default (initState: any | undefined = {}) => useReducer(reducers, initState);
