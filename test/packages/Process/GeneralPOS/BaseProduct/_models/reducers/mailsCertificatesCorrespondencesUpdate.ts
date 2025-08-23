/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId, validating } = payload;

    draftState.entities.transactionTypesMap[transactionId].mailCertificateCorrespondence = {
      ...draftState.entities.transactionTypesMap[transactionId]
        .mailCertificateCorrespondence,
      ...changedFields,
    };

    if (!validating) {
      if (
        lodash.hasIn(changedFields, 'sendTo') &&
        formUtils.queryValue(changedFields.sendTo) !== 'B'
      ) {
        draftState.entities.transactionTypesMap[
          transactionId
        ].mailCertificateCorrespondence.branchCode = null;
      }
    }
  });
