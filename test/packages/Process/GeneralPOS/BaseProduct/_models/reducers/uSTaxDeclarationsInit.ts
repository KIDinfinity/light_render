/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    if (lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId]?.usTaxInformation)) {
      draftState.entities.transactionTypesMap[transactionId].usTaxInformation = {
        taxDeclarationsFlag: 'N',
      };
    }
  });
