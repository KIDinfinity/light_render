import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, contactItemId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const contactInfoList = lodash.get(dataItem, 'contactInfoList', []);
    const contactInfoIndex = lodash.findIndex(
      contactInfoList,
      (item: any) => item?.id === contactItemId
    );
    const contactInfoDataItem = lodash.find(contactInfoList, (item) => item?.id === contactItemId);
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].contactInfoList[${contactInfoIndex}]`,
      { ...contactInfoDataItem, deleted: 1 }
    );
  });
  return { ...nextState };
};
