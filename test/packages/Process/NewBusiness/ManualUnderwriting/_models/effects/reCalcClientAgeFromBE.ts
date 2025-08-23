import lodash from 'lodash';
import { getClientAge } from '@/services/getClientAge';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
export default function* getClientAgeFromBE({ payload }: any, { call, put, select }: any) {
  const { currentClientId, dateOfBirth } = payload;
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  const businessData = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: { ...processData, ...modalData.processData },
      entities: { ...entities, ...modalData.entities },
    },
  });
  const currentClient = lodash.find(
    businessData?.policyList[0]?.clientInfoList,
    (item) => item.id === currentClientId
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
