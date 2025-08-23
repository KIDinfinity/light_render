import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import saveDiffCilentInfoList from './saveDiffCilentInfoList';

export default (state: any, action: any) => {
  const { changedFields, id, crtItemId } = action?.payload;
  let nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    lodash.set(draftState, 'stepsChange.ClientInfo', true);
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const crtInfoList = lodash.get(dataItem, 'crtInfoList', []) || [];
    const crtItemIndex = lodash.findIndex(crtInfoList, (item: any) => item.id === crtItemId);
    const crtItem = lodash.find(crtInfoList, (item) => item.id === crtItemId);
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].crtInfoList[${crtItemIndex}]`,
      {
        ...crtItem,
        ...changedFields,
      }
    );
    if (crtItem?.type === 'P') {
      const identityNo = formUtils.queryValue(crtItem?.ctfId);
      const identityType = formUtils.queryValue(crtItem?.ctfType);
      lodash.set(
        draftState,
        `businessData.policyList[0].clientInfoList[${index}].identityNo`,
        identityNo
      );
      lodash.set(
        draftState,
        `businessData.policyList[0].clientInfoList[${index}].identityType`,
        identityType
      );
    }
  });

  nextState = saveDiffCilentInfoList(nextState, {
    payload: {
      preState: state,
      id,
    },
  });
  return {
    ...nextState,
  };
};
