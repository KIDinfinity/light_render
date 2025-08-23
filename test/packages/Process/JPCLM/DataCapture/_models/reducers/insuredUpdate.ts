import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { PAYEEITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import { saveDefaultPayee, getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';

const insuredUpdate = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...changedFields,
      policyId:
        lodash.size(changedFields) === 1 && lodash.has(changedFields, 'policyId')
          ? lodash.trim(formUtils.queryValue(changedFields?.policyId))
          : draftState.claimProcessData.insured?.policyId,
    };
    const payeeListMap = lodash.get(draftState, 'claimEntities.payeeListMap');
    const payeeId = getDefaultPayeeId(payeeListMap);

    if (!payeeId) {
      const id = uuidv4();
      draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
      draftState.claimEntities.payeeListMap[id] = saveDefaultPayee({
        ...PAYEEITEM,
        claimNo: draftState.claimProcessData.claimNo,
        id,
      });
    }
  });

  return { ...nextState };
};

export default insuredUpdate;
