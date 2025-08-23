import { produce }  from 'immer';
import { set } from 'lodash';
import type { VNBCalculatorState } from '../state';

export default (state: VNBCalculatorState, { payload }: any) => {
  const { key, data } = payload;
  const nextState = produce(state, (draftState) => {
    set(draftState, key, data);
  });
  return nextState;
};
