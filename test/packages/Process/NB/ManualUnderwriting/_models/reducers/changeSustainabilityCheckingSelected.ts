import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const sustainabilityCheckingSelected = lodash.get(
    action,
    'payload.sustainabilityCheckingSelected',
    ''
  );
  const options = lodash.get(state, 'sustainabilityCheckingData.sustainabilityOptions', []);
  const selectedItem = lodash
    .chain(options)
    .find((item: any) => item.optionName === sustainabilityCheckingSelected)
    .value();
  const nextState = produce(state, (draftState: any) => {
    const sustainabilityOptions = lodash
      .chain(draftState)
      .get('sustainabilityCheckingData.sustainabilityOptions', [])
      .map((item: any) => {
        return {
          ...item,
          applied: selectedItem?.optionName === item.optionName ? 'Y' : 'N',
        };
      })
      .value();
    lodash.set(
      draftState,
      'sustainabilityCheckingData.sustainabilityOptions',
      sustainabilityOptions
    );
  });
  return {
    ...nextState,
  };
};
