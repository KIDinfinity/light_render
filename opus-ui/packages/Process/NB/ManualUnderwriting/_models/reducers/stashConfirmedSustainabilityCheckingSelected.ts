import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const sustainabilityCheckingData = state?.sustainabilityCheckingData;
  const confirmedSustainabilityCheckingSelected = lodash
    .chain(sustainabilityCheckingData)
    .get('sustainabilityOptions', [])
    .find((item: any) => item.applied === 'Y')
    .get('optionName')
    .value();
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'confirmedSustainabilityCheckingSelected',
      confirmedSustainabilityCheckingSelected
    );
  });
  return {
    ...nextState,
  };
};
