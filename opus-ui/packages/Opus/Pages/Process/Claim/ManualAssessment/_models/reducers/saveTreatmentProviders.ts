import { produce } from 'immer';

const saveTreatmentProviders = (state: any, action: any) => {
  const { treatmentProviders, serviceItemId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (serviceItemId) {
      draftState.dropdownMap.treatmentProviderMap = {
        ...(draftState.dropdownMap.treatmentProviderMap || {}),
        [serviceItemId]: treatmentProviders,
      };
    }
  });

  return { ...nextState };
};

export default saveTreatmentProviders;
