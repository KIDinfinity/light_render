import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const fundInfoList = lodash
    .filter(Object.values(state?.modalData?.fund?.fundList) || [], (fund: any) => !fund?.isLast)
    .map((fund: any) => {
      return formUtils.objectQueryValue(fund);
    });
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.fund = {
      fundInfoList: fundInfoList,
      fundBaseInfo: draftState?.modalData?.fund?.fundInfo,
    };
  });
  return { ...nextState };
};
