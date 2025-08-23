import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const posRequestInformation = lodash.get(
      draftState,
      'claimProcessData.businessData.posRequestInformation',
      {}
    );

    // eslint-disable-next-line no-param-reassign
    // TODO: maybe transaction type
    draftState.claimProcessData.businessData = {
      ...draftState.claimProcessData.businessData,
      posRequestInformation: {
        ...posRequestInformation,
        ...changedFields,
      },
    };
  });
  return nextState
};
