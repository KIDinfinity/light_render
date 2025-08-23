/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const policyLoanPath = `entities.transactionTypesMap[${transactionId}].mailCertificateCorrespondence`;

    if (lodash.isEmpty(lodash.get(draftState, `${policyLoanPath}`))) {
      lodash.set(draftState, `${policyLoanPath}`, {
        sendTo: 'P',
      });
    }
  });
