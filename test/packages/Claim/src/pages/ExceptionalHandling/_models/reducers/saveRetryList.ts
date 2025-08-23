import lodash from 'lodash';
import { produce } from 'immer';

const saveRetryList = (state: any, action: any) => {
  const { retryList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.retryList = retryList;
    draftState.claimProcessData.retry = lodash
      .chain(retryList)
      ?.filter((item: any) => !/success/i.test(item?.status))
      .map((item: any) => item?.integrationCode)
      .value();
  });
  return { ...nextState };
};

export default saveRetryList;
