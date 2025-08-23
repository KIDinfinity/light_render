import { produce }  from 'immer';

export default (state: any, { payload = {} }: any) => {
  const { sectionIndex, insured, ...rest } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData[sectionIndex] = {
      ...draftState.claimProcessData[sectionIndex],
      ...rest,
      insured,
      insuredId: insured?.insuredId,
      insuredName: `${insured?.firstName || ''} ${insured?.surname || ''}`,
    };
  });
  return { ...nextState };
};
