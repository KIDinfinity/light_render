import { produce } from 'immer';
import initState from '../state';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState = { ...initState };
  });
  return { ...nextState };
};
