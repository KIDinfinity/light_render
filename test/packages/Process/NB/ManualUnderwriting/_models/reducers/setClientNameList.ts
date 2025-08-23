import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { clientName } = action.payload;
  const { clientNameList } = state;
  const name = formUtils.queryValue(clientName);
  const newClient = {
    dictCode: name,
    dictName: name,
  };
  const nextState = produce(state, (draftState: any) => {
    draftState.clientNameList = [...clientNameList, newClient];
  });
  return { ...nextState };
};
