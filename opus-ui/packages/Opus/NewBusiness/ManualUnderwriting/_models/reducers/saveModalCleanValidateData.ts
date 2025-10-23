import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData = formUtils.formatFlattenValue(
      formUtils.cleanValidateData(draftState.modalData.processData)
    );
  });
  return {
    ...nextState,
  };
};
