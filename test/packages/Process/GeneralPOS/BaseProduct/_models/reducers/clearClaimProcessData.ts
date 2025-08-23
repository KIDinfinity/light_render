/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import initState from '../state';

export default (state: any) => produce(state, () => initState);
