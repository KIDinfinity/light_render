import { batchCalcAge } from '@/services/posSrvAgeBatchCalcControllerService';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

export default function* (payload, { call, put, select }: any) {
  const policyInfo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const { mainOwnerClientId, mainInsuredClientId, mainPayorClientId } = policyInfo;

  const ownerInfo = lodash.find(
    policyInfo.clientInfoList,
    (item: any) => item.clientId === mainOwnerClientId
  );

  const insuredInfo = lodash.find(
    policyInfo.clientInfoList,
    (item: any) => item.clientId === mainInsuredClientId
  );

  const payorInfo = lodash.find(
    policyInfo.clientInfoList,
    (item: any) => item.clientId === mainPayorClientId
  );

  const batchCalcAgeParam = [];
  if (ownerInfo) {
    batchCalcAgeParam.push({
      clientId: mainOwnerClientId,
      dob: ownerInfo.dob,
    });
  }
  if (insuredInfo) {
    batchCalcAgeParam.push({
      clientId: mainInsuredClientId,
      dob: insuredInfo.dob,
    });
  }
  if (payorInfo) {
    batchCalcAgeParam.push({
      clientId: mainPayorClientId,
      dob: payorInfo.dob,
    });
  }
  const result = yield call(batchCalcAge, batchCalcAgeParam);

  if (lodash.isPlainObject(result) && result.success) {
    const { resultData: ageData = [] } = result;

    yield put({
      type: 'savePolicyInfo',
      payload: {
        key: 'clientInfoList',
        data: policyInfo.clientInfoList?.map((item: any) => {
          const matchAgeData = lodash.find(ageData, (data: any) => data.clientId === item.clientId);

          if (matchAgeData) {
            return {
              ...item,
              age: matchAgeData.age,
            };
          }

          return item;
        }),
      },
    });
  }
}
