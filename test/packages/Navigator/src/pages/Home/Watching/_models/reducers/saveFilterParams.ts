/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import lodash from 'lodash';

const saveFilterParams = (state: any, { payload }: any) => {
  const { changeValue } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.filterParams = lodash.pickBy({ ...draftState.filterParams, ...changeValue });
  });

  return { ...nextState };
};

export default saveFilterParams;
