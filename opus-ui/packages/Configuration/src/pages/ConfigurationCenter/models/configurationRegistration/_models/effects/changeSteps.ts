import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { currentStep } = payload;
  yield put({
    type: 'saveSteps',
    payload: {
      currentStep,
    },
  });
}
