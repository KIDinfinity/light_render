import { produce }  from 'immer';
import lodash from 'lodash';

const saveSerialTreatmentPayableList = (state: any, action: any) => {
  const { list } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.serialClaim.treatmentPayableList = lodash
      .chain(list)
      .reduce((arr: any, item: any) => {
        return [...arr, ...item.treatmentPayableDOList];
      }, [])
      .value();
  });

  return { ...nextState };
};

export default saveSerialTreatmentPayableList;
