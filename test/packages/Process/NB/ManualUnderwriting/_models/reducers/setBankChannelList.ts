import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const bankChannelList = lodash.get(action, 'payload.bankChannelList', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'bankChannelList',
      bankChannelList.map((item: any) => ({
        ...item,
        dictCode: item.bankCode,
        dictName: item.bankName,
      }))
    );
  });
  return {
    ...nextState,
  };
};
