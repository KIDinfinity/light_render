import lodash from 'lodash';
import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put, select }: SagaProps) {
  const { steps, currentStep } = yield select((state: any) => state.registrationController);
  const { description, ...others } = payload;
  const newSteps = steps.map((el: any, key: any) => {
    if (key === currentStep) {
      lodash.set(el, 'description', description);
    }
    return el;
  });

  yield put({
    type: 'saveSteps',
    payload: {
      steps: newSteps,
      ...others,
    },
  });
}
