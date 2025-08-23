/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, coverData } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    lodash.set(draftState, transactionPath, {
      ...lodash.get(draftState, transactionPath, {}),
      ...coverData,
    });
  });
