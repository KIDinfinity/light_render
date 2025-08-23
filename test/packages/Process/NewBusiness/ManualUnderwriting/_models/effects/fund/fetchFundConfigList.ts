import { getAllFundConfigList } from '@/services/miscCfgInquiryControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getAllFundConfigList, {});
  if (Array.isArray(response)) {
    const fundConfigList = response?.reduce((pre: any, nxt: { fundCode: any }) => {
      return { ...pre, [nxt?.fundCode]: nxt };
    }, {});
    yield put({
      type: 'setFundConfigList',
      payload: {
        fundConfigList,
      },
    });
  }
  return response;
}
