import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

 // 重置搜索条件
export default function* ({ payload }: PayProps, { put }: SagaProps) {
  yield put({
    type: 'save',
    payload: {
      searchDefault: {},
      ...payload,
    },
  });
}
