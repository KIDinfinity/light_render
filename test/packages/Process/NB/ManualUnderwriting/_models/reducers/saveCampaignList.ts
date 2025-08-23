import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { campaignList } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.campaignList = campaignList;
  });
  return { ...nextState };
};
