import { produce } from 'immer';

const saveRetry = (state: any, action: any) => {
  const { integrationCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const retry = draftState.claimProcessData.retry || [];
    // eslint-disable-next-line
    draftState.claimProcessData.retry = retry?.includes(integrationCode)
      ? retry?.filter((item: string) => item !== integrationCode)
      : [...retry, integrationCode]

  });

  return { ...nextState };
};

export default saveRetry;
