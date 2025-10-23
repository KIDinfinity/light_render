/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields } = payload;
    draftState.processData = {
      ...draftState.processData,
      ...changedFields,
    };
    if (lodash.has(changedFields, 'subCaseSubmissionTime')) {
      draftState.processData.subCaseSubmissionDate = changedFields?.subCaseSubmissionTime;
    }
  });
