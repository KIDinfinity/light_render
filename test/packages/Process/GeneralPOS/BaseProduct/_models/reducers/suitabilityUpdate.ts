/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId, validating } = payload;
    draftState.entities.transactionTypesMap[transactionId].suitability = {
      ...draftState.entities.transactionTypesMap[transactionId].suitability,
      ...changedFields,
    };
    if (!validating) {
      draftState.entities.transactionTypesMap[transactionId].suitability.editFlag = 1;
    }
    if (lodash.hasIn(changedFields, 'validSuitability')) {
      const [value] = Object.values(formUtils.cleanValidateData(changedFields.validSuitability));

      draftState.entities.transactionTypesMap[transactionId].suitability = {
        ...draftState.entities.transactionTypesMap[transactionId].suitability,
        validSuitability: value === 1 ? 'Y' : 'N',
      };
    }
    if (
      lodash
        .entries(draftState.entities.transactionTypesMap[transactionId].suitability)
        .every(
          ([key, value]) =>
            key === 'validSuitability' || lodash.isEmpty(formUtils.queryValue(value))
        )
    ) {
      draftState.entities.transactionTypesMap[transactionId].suitability =
        formUtils.cleanValidateData(
          draftState.entities.transactionTypesMap[transactionId].suitability
        );
    }
  });
