import { produce } from 'immer';
import defState from '../state';

export default (state: any) => {
  return produce(state, (draft: any) => {
    return { ...defState };
  });
};
