import { produce }  from 'immer';
import lodash from 'lodash';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import BankSource from 'process/NB/Enum/BankSource';

export default (state: any, action: any) => {
  const { id } = lodash.pick(action?.payload, ['id']);
  const nextState = produce(state, (draftState: any) => {
    const bankInfoList = lodash
      .chain(draftState)
      .get(`businessData.policyList[0].bankInfoList`, [])
      .map((item: any) => {
        const type = (() => {
          if (item?.id === id) {
            return BankInfoType.Withdrawal;
          }
          if (item.type === BankInfoType.Withdrawal) {
            if (item?.source === BankSource.LA) {
              return BankInfoType.Existing;
            }
            return null;
          }
          return item.type;
        })();
        const selection = item?.id === id ? 'Y' : 'N';
        return {
          ...item,
          type,
          selection,
        };
      })
      .value();
    lodash.set(draftState, 'businessData.policyList[0].bankInfoList', bankInfoList);
  });
  return { ...nextState };
};
