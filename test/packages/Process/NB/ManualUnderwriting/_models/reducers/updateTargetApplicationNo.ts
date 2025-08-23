import lodash from 'lodash';
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { targetApplicationNo, policyNo } = lodash.pick(action?.payload, [
    'targetApplicationNo',
    'policyNo',
  ]);

  const nextState = produce(state, (draftState: any) => {
    const premiumTransferList = lodash
      .chain(draftState)
      .get('businessData.policyList[0].premiumTransferList', [])
      .map((item: any) => {
        if (formUtils.queryValue(item?.targetPolicyId) === policyNo) {
          return {
            ...item,
            targetApplicationNo,
          };
        }
        return item;
      })
      .value();

    lodash.set(draftState, 'businessData.policyList[0].premiumTransferList', premiumTransferList);
  });
  return { ...nextState };
};
