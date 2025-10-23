import { produce } from 'immer';
import lodash from 'lodash';

export default function setSendCondition(state: any, action: any) {
  return produce(state, (draftState: any) => {
    lodash.set(draftState, 'sendCondition', {
      sendConditionShow: lodash.get(action, 'payload.sendConditionShow', false),
      resultInfoStatus: lodash.get(action, 'payload.resultInfoStatus', null),
    });
  });
}
