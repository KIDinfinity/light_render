/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 关闭
 */
import { produce }  from 'immer';

const popUpPableDelete = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.isShowPopUpPayable = false;
    draftState.popUpPayable = {};
  });

  return { ...nextState };
};

export default popUpPableDelete;
