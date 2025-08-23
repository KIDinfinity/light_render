import { produce } from 'immer';
import lodash from 'lodash';

const SKIPINTEGRATION = 'skipIntegration';

const saveSkipIntegration = (state: any, { payload }: any) => {
  const { changedFields } = payload;

  return produce(state, (draftState: any) => {
    const draft = draftState;
    const flagArr = lodash.split(draft.claimProcessData.flags, ',');
    const isSkipIntegration = changedFields.skipIntegration.value === 1;
    let newFlagVal = ''
    if (isSkipIntegration) {
      flagArr.push(SKIPINTEGRATION);
      newFlagVal = lodash.chain(flagArr).uniq().compact().join(',').value();

    } else {
      newFlagVal = lodash.chain(flagArr).remove((item) => item !== SKIPINTEGRATION).join(',').value();

    }
    draft.claimProcessData.flags = newFlagVal;
    draft.claimProcessData.skipIntegration = changedFields.skipIntegration.value;
  });
};

export default saveSkipIntegration;
