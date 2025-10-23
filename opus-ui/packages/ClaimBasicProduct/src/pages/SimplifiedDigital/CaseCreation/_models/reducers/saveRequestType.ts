/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, validating } = payload;

    draftState.processData = {
      ...draftState.processData,
      ...changedFields,
    };
    if (!validating && lodash.hasIn(changedFields, 'businessType')) {
      draftState.processData.transactionTypeCode = '';
      draftState.processData.letterInfo = {};
    }
  });
