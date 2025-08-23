import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { bankSectionIndex } = lodash.pick(action?.payload, ['bankSectionIndex']);
  const nextState = produce(state, (draftState: any) => {
    const bankList = lodash.get(draftState, `businessData.policyList[0].bankInfoList`);
    lodash.each(bankList, (bankItem) => {
      bankItem.type =
        !lodash.isNull(bankItem.type) && lodash.lowerCase(bankItem.type) === 'w'
          ? 'E'
          : bankItem.type;
    });
    lodash.set(draftState, `businessData.policyList[0]`, {
      ...lodash.get(draftState, `businessData.policyList[0]`),
      bankInfoList: bankList,
    });
    lodash.set(draftState, `businessData.policyList[0].bankInfoList[${bankSectionIndex}]`, {
      ...lodash.get(draftState, `businessData.policyList[0].bankInfoList[${bankSectionIndex}]`),
      type: 'W',
    });
  });
  return { ...nextState };
};
