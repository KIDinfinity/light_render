import { produce } from 'immer';
import lodash from 'lodash';

import { handleUpdateCoverageList } from './decision/changeSustainabilityCheckingSelected';
import { getOptionName } from './initSustainability';

export default (state: any, { payload }: any) => {
  const {
    coverageList,
    sustainabilityOptions,
    possibleSusOptIdAndNameList,
    customizeSusOptIdList,
  } = lodash.pick(payload, [
    'coverageList',
    'sustainabilityOptions',
    'possibleSusOptIdAndNameList',
    'customizeSusOptIdList',
  ]);
  const nextState = produce(state, (draftState: any) => {
    const optionItem = lodash.find(sustainabilityOptions, { applied: 'Y' });

    draftState.sustainabilityModal = {
      coverageList: coverageList || [],
      sustainabilityOptions: lodash.map(sustainabilityOptions || [], (item: any) => {
        const title = getOptionName(item?.optionName);
        return {
          ...item,
          title,
        };
      }),
      possibleSusOptIdAndNameList: possibleSusOptIdAndNameList || [],
      customizeSusOptIdList: customizeSusOptIdList || [],
    };

    const converageListApplied = handleUpdateCoverageList({ draftState, optionItem });

    draftState.sustainabilityModal.converageListApplied = converageListApplied;
  });

  return {
    ...nextState,
  };
};
