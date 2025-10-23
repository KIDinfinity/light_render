import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

 // 刷新当前页面
export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const {
    searchDefault,
    dataImageFunction: { id: functionId, functionCode },
  } = yield select((state: any) => state.configurationDataImage);
  yield put({
    type: 'listPage',
    payload: {
      functionId,
      functionCode,
      ...searchDefault,
      ...payload,
    },
  });
}
