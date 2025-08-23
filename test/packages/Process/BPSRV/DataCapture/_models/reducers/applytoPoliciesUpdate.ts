/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload, validating }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, cloneListId, changedFields } = payload;

    if (!validating) {
      const isSelect = formUtils.queryValue(changedFields.policySelection) === 1;

      // 根据勾选决定添加去除policy
      if (isSelect) {
        draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList.push(
          cloneListId
        );
      } else {
        draftState.entities.transactionTypesMap[
          transactionId
        ].applyToPolicyBOList = draftState.entities.transactionTypesMap[
          transactionId
        ].applyToPolicyBOList.filter((id: any) => id !== cloneListId);
      }
    }
  });
