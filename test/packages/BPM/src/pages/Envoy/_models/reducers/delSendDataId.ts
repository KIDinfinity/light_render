import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    sendDataId: string;
  };
}

export default function delSendDataId (state: any, { payload }: IAction) {
  const { sendDataId } = payload;
  return produce(state, (draftState: any) => {
    draftState.sendDataIdArr = lodash.filter(
      draftState.sendDataIdArr,
      (item: string) => item !== sendDataId
    );
    return draftState;
  });
}
