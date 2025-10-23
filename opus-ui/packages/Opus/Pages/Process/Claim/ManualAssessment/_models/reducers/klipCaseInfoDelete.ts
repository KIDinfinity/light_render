import { produce } from 'immer';
import lodash from 'lodash';

const klipCaseInfoDelete = (state: any, action: any) => {
  const { id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.popupData.klipCaseInfoList = lodash.filter(
      draftState?.popupData?.klipCaseInfoList,
      (item) => item?.id !== id
    );
  });

  return { ...nextState };
};

export default klipCaseInfoDelete;
