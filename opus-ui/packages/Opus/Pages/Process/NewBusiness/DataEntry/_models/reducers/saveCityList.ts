import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { cityDict } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    for (const key of Object.keys(cityDict)) {
      draftState.cityDict[key] = cityDict[key];
    }
  });
  return {
    ...nextState,
  };
};
