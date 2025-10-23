import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { currentTab, isTabSearch = true } = payload;

  yield put({
    type: 'save',
    payload: {
      currentTab,
      isTabSearch,
    },
  });
}
