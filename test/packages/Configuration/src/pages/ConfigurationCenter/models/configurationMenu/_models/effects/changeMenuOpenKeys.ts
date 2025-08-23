import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

// 菜单展开
export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { openKeys } = payload;

  yield put({
    type: 'save',
    payload: {
      openKeys,
    },
  });
}
