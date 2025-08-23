/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id } = payload;
    const notESubmission = draftState.processData.caseCategory !== 'BP_SRV_CTG002';

    if (notESubmission) {
      if (draftState.entities.transactionTypesMap[id].contactInfo === null) {
        draftState.entities.transactionTypesMap[id].contactInfo = lodash.pick(
          draftState.processData?.policyInfo?.clientContact,
          [
            'email',
            'phoneNo',
            'policyId',
            'sourceSystem',
            'subTypeCode',
            'workNo',
            'homeNo',
            'clientId',
          ]
        );
      } else {
        draftState.entities.transactionTypesMap[id].contactInfo = lodash.pick(
          {
            ...draftState.processData?.policyInfo?.clientContact,
            ...draftState.entities.transactionTypesMap[id].contactInfo,
          },
          [
            'email',
            'phoneNo',
            'policyId',
            'sourceSystem',
            'subTypeCode',
            'workNo',
            'homeNo',
            'clientId',
          ]
        );
      }
    } else {
      if (draftState.entities.transactionTypesMap[id].contactInfo !== null) {
        draftState.entities.transactionTypesMap[id].contactInfo = {
          ...draftState.entities.transactionTypesMap[id].contactInfo,
          ...lodash.pick(draftState.processData?.policyInfo?.clientContact, [
            'sourceSystem',
            'subTypeCode',
            'clientId',
          ]),
        };
      }
    }
  });
