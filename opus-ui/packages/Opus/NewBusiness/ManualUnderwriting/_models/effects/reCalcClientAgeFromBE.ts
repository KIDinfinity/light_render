import lodash from 'lodash';
import { getClientAge } from '@/services/getClientAge';
import { formUtils } from 'basic/components/Form';
export default function* getClientAgeFromBE({ payload }: any, { call, put, select }: any) {
  const { currentClientId, dateOfBirth } = payload;

  const businessData = yield put.resolve({
    type: 'getDataForSubmit',
  });

  const currentClient = yield select(
    ({ newBusinessManualUnderwriting }: any) =>
      newBusinessManualUnderwriting?.modalData?.entities?.clientMap[currentClientId]?.personalInfo
  );
  lodash.set(businessData, 'policyList[0].clientInfoList', [
    {
      ...formUtils.formatFlattenValue(formUtils.cleanValidateData(currentClient)),
      dateOfBirth,
    },
  ]);

  if (!lodash.isEmpty(currentClient)) {
    const response = yield call(getClientAge, {
      ...businessData,
    });

    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    const clientAge = lodash.get(resultData, 'clientAge');

    if (success && resultData) {
      yield put({
        type: 'savePersonalInfo',
        payload: {
          id: currentClientId,
          changedFields: {
            customerAge: clientAge,
          },
        },
      });
    }
  }
}
