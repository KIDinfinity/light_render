import { produce } from 'immer';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { handleUpdateCoverageList } from './decision/changeSustainabilityCheckingSelected';

const getOptionName = (optionName: string) => {
  const mapping = {
    initial: 'Initial Version',
    increasePrem: formatMessageApi({
      Label_BIZ_policy: 'increasePrem',
    }),
    reduceSA: formatMessageApi({
      Label_BIZ_policy: 'reduceSA',
    }),
    prolongTerm: formatMessageApi({
      Label_BIZ_policy: 'prolongTerm',
    }),
    RT: formatMessageApi({
      Label_BIZ_policy: 'RT',
    }),
    'increasePrem-RT': formatMessageApi({
      Label_BIZ_policy: 'increasePrem-RT',
    }),
  };

  const keys = lodash
    .chain(optionName)
    .split('&')
    .filter((key) => !!key)
    .value();
  return lodash
    .chain(keys)
    .map((key) => {
      return (
        mapping[key] ||
        formatMessageApi({
          Label_BIZ_policy: key,
        })
      );
    })
    .join(' & ')
    .value();
};

export { getOptionName };

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const optionItem = lodash.find(draftState.processData?.sustainabilityOptions, { applied: 'Y' });

    draftState.sustainabilityModal = {
      coverageList: draftState.processData?.coverageList || [],
      sustainabilityOptions: lodash.map(
        draftState.processData?.sustainabilityOptions || [],
        (item: any) => {
          const title = getOptionName(item?.optionName);
          return {
            ...item,
            title,
          };
        }
      ),
      possibleSusOptIdAndNameList: draftState.processData?.possibleSusOptIdAndNameList || {},
      customizeSusOptIdList: draftState.processData?.customizeSusOptIdList || [],
    };

    const converageListApplied = handleUpdateCoverageList({ draftState, optionItem });

    draftState.sustainabilityModal.converageListApplied = converageListApplied;
  });

  return {
    ...nextState,
  };
};
