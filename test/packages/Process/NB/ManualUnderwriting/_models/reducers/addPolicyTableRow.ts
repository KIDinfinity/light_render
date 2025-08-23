import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

const addPolicyTableRow = (state: any) => {
  const orderNum = (() => {
    return lodash.chain(state).get('businessData.policyList[0].replacementInfoList', []).value()
      ?.length;
  })();
  const newRow = {
    insuranceCompanyName: '',
    insurerName: '',
    otherPolicyType: '',
    otherReason: '',
    policyId: '',
    policyReplacementFlag: '',
    policyType: '',
    reasonForPolicyReplacement: '',
    roleCode: null,
    sumAssured: null,
    id: uuidv4(),
    orderNum,
  };
  const nextState = produce(state, (draftState: any) => {
    const replacementInfoList =
      lodash.get(draftState, 'businessData.policyList[0].replacementInfoList', []) || [];
    lodash.set(draftState, 'businessData.policyList[0].replacementInfoList', [
      ...replacementInfoList,
      newRow,
    ]);
  });
  return { ...nextState };
};

export default addPolicyTableRow;
