import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, crtItemId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const crtInfoList = lodash.get(dataItem, 'crtInfoList', []);
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].crtInfoList`,
      lodash.map(crtInfoList, (item) => {
        if (item.id === crtItemId) {
          return { ...item, deleted: 1 };
        }
        return item;
      })
    );
  });
  return { ...nextState };
};
