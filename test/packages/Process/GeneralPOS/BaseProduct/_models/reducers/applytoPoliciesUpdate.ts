/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
export default (state: any, { payload, validating }: any) =>
  produce(state, (draftState: any) => {
    const { cloneListId, transactionId, changedFields } = payload;
    draftState.entities.policyInfoBOListMap[cloneListId] = {
      ...draftState.entities.policyInfoBOListMap[cloneListId],
      ...changedFields,
    };

    if (!validating) {
      if (lodash.has(changedFields, 'policySelection')) {
        if (
          lodash.isEmpty(
            draftState.entities.transactionTypesMap[transactionId]?.applyToPolicyBOList
          )
        ) {
          draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [];
        }
        const isSelect = formUtils.queryValue(changedFields.policySelection) === 1;

        if (isSelect) {
          draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList.push(
            cloneListId
          );
        } else {
          draftState.entities.transactionTypesMap[
            transactionId
          ].applyToPolicyBOList = draftState.entities.transactionTypesMap[
            transactionId
          ].applyToPolicyBOList.filter((id: string) => id !== cloneListId);
        }
      }
    }
  });
