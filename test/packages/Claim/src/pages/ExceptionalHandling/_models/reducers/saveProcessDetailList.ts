import { produce } from 'immer';

const saveRetry = (state: any, action: any) => {
  const { currentProcessDetail } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const processDetailList = draftState.processDetailList || [];
    // eslint-disable-next-line
    draftState.processDetailList = processDetailList?.find((item: any) => item?.id === currentProcessDetail?.id)
      ? processDetailList
      : [...processDetailList, currentProcessDetail]
  });
  return { ...nextState };
};

export default saveRetry;
