import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const newItemId = uuidv4();
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const crtInfoList = lodash.get(dataItem, 'crtInfoList', []) || [];
    crtInfoList.push({
      id: newItemId,
      type: 'S',
      ctfType: 'TN',
    });
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].crtInfoList`,
      crtInfoList
    );
  });
  return {
    ...nextState,
  };
};
