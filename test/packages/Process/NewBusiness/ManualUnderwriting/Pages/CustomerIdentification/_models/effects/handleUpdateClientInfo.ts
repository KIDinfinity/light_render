import lodash from 'lodash';

export default function* ({ payload }: any, { put }: any) {
  const { submitResponse, businessNo } = lodash.pick(payload, ['submitResponse', 'businessNo']);

  const success = lodash.get(submitResponse, 'success');
  if (!success) {
    yield put({
      type: `getCustomerIdentificationData`,
      payload: { businessNo },
    });
  }
}
