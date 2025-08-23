import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';

const saveChequeRemark = (state: any, action: any) => {
  const { changedFields, chequeRemarkId } = action.payload;
  const isEditStatus = lodash.keys(changedFields).length === 1;
  const payeeListMap = lodash.get(state, 'claimEntities.payeeListMap');
  const payeeId = getDefaultPayeeId(payeeListMap);

  const nextState = produce(state, (draftState: any) => {
    if (isEditStatus && lodash.has(changedFields, 'remark')) {
      const claimChequeRemarkList =
        draftState.claimEntities.payeeListMap[payeeId]?.claimChequeRemarkList;
      draftState.claimEntities.payeeListMap[payeeId].claimChequeRemarkList = lodash.map(
        claimChequeRemarkList,
        (remarkItem): any => {
          if (remarkItem.id === chequeRemarkId) {
            const currentRemark = formUtils.queryValue(changedFields.remark);

            return currentRemark?.length > 80 ? remarkItem : { ...remarkItem, ...changedFields };
          }
          return remarkItem;
        }
      );
    }
  });

  return { ...nextState };
};

export default saveChequeRemark;
