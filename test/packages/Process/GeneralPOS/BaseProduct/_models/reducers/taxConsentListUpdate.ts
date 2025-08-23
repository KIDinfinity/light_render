/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields, index } = payload;
    const path = `entities.transactionTypesMap.${transactionId}.taxConsentList`;
    if (lodash.get(draftState, `${path}[${index}]`)) {
      draftState.entities.transactionTypesMap[transactionId].taxConsentList[index] = {
        ...draftState.entities.transactionTypesMap[transactionId].taxConsentList[index],
        ...changedFields,
      };
    } else {
      const taxConsentList = lodash.get(draftState, path, []);
      const newTaxConsentList = taxConsentList;
      newTaxConsentList[index] = { ...changedFields };
      lodash.set(draftState, path, newTaxConsentList);
    }
  });
