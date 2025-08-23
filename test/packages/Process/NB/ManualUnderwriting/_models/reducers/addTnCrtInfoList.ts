import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, itemId, ctfCountryCode, ctfId, reasonflag, reason, ctfType, type,clientId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const crtInfoList = lodash.get(clientInfoList, `[${index}].crtInfoList`, []) || [];
    crtInfoList.push({
      id: itemId,
      ctfCountryCode,
      ctfId,
      reasonflag,
      reason,
      ctfType,
      type,
      clientId
    });
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].crtInfoList`,
      crtInfoList
    );
  });
  return { ...nextState };
};
