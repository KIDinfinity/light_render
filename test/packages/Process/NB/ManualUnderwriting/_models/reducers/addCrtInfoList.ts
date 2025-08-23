import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, itemId, ctfType, ctfId, ctfCountryCode, ctfExpireDate, type } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    lodash.set(draftState, `businessData.policyList[0].clientInfoList[${index}].crtInfoList`, [
      {
        id: itemId,
        ctfType,
        ctfId,
        ctfCountryCode,
        ctfExpireDate,
        type,
      },
    ]);
  });
  return { ...nextState };
};
