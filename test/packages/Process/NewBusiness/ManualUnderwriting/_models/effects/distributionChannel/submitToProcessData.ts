import { confirmDistributionChannelListSelector } from 'process/NewBusiness/ManualUnderwriting/Pages/DistributionChannel/selectors';

export default function* (_: any, { put, select }: any) {
  // @ts-ignore
  const processData = yield select(confirmDistributionChannelListSelector);
  yield put({
    type: 'setProcessData',
    payload: {
      processData,
    },
  });
}
