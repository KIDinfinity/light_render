/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload: { changedFields } }: any) =>
  produce(state, (draftState: any) => {
    draftState.newCertificateTable = {
      ...draftState.newCertificateTable,
      ...formUtils.mapFieldsToObj(changedFields),
    };
    draftState.isRequired = true;
  });
