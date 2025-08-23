import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { currentStep, steps } = yield select((state: any) => state.registrationController);
  const newStep = steps?.length >= currentStep + 1 ? currentStep + 1 : currentStep;
  yield put({
    type: 'saveSteps',
    payload: {
      currentStep: newStep,
      ...payload,
    },
  });
}
