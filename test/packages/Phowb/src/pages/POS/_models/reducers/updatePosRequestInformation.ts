import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const posRequestInformation = lodash.get(
      draftState,
      'claimProcessData.posDataDetail.posRequestInformation',
      {}
    );

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail = {
      ...draftState.claimProcessData.posDataDetail,
      posRequestInformation: {
        ...posRequestInformation,
        ...changedFields,
      },
    };
  });
  return { ...nextState };
};
