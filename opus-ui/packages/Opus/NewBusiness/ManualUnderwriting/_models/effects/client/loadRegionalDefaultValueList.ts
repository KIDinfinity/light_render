import owbNbCfgControllerService from '@/services/owbNbCfgControllerService';

export default function* loadRegionalDefaultValueList(
  _: any,
  { call, put }: any
): Generator<any, void, any> {
  const response = yield call(owbNbCfgControllerService.getRegionalDefaultValues);

  if (response?.success) {
    yield put({
      type: 'setRegionalDefaultValueList',
      payload: {
        cfgRegionalDefaultValueList: response?.resultData,
      },
    });
  }
}
