import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const sustainabilityCheckingData = lodash.get(action, 'payload.sustainabilityCheckingData', {});
  const nextState = produce(state, (draftState: any) => {
    const newData = lodash
      .chain(sustainabilityCheckingData)
      .get('sustainabilityOptions')
      .map((item: any) => {
        const applied = (() => {
          return lodash.isEmpty(draftState?.sustainabilityCheckingData?.sustainabilityOptions)
            ? item?.applied
            : lodash
                .chain(draftState)
                .get('sustainabilityCheckingData.sustainabilityOptions')
                .find((optionItem: any) => {
                  return (
                    optionItem?.optionName === item?.optionName &&
                    optionItem?.version === item?.version
                  );
                })
                .get('applied')
                .value() || 'N';
        })();
        return {
          ...item,
          applied,
        };
      })
      .value();

    lodash.set(draftState, 'sustainabilityCheckingData', {
      ...sustainabilityCheckingData,
      sustainabilityOptions: newData,
    });
  });
  return {
    ...nextState,
  };
};
