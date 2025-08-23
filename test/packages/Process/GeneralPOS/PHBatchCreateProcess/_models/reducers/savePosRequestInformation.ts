/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, validating } = payload;

    const newChangedFields = !!validating
      ? lodash.pick(changedFields, [
          'policyNo',
          'subCaseSubmissionChannel',
          'subCaseSubmissionDate',
          'subCaseSubmissionTime',
        ])
      : changedFields;
    draftState.processData = {
      ...draftState.processData,
      ...newChangedFields,
    };
    if (lodash.has(changedFields, 'subCaseSubmissionTime')) {
      draftState.processData.subCaseSubmissionDate = newChangedFields?.subCaseSubmissionTime;
    }
  });
