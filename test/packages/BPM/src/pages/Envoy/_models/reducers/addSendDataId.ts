import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    sendDataId: string;
  };
}

export default function addSendDataId (state: any, { payload }: IAction) {
  const { sendDataId } = payload;
  return produce(state, (draftState: any) => {
    const { sendDataIdArr } = draftState;
    if (!lodash.includes(sendDataIdArr, sendDataId)) {
      draftState.sendDataIdArr.push(sendDataId);
    }
    return draftState;
  });
}
