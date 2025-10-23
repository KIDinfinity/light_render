import lodash from 'lodash';
import { retrieve3Cilndicator } from '@/services/claimDiagnosisControllerService';
import { NAMESPACE } from '../../activity.config';

export default function* retrieve3CiIndicator({ payload = {} }: any, { call, put, select }: any) {
  const { diagnosisCode, diagnosisId } = payload;
  let diagnosisCodeList = [];
  let diagnosisIdList = [];

  if (diagnosisCode && diagnosisId) {
    diagnosisCodeList = [diagnosisCode];
    diagnosisIdList = [diagnosisId];
  } else {
    const diagnosisListMap: any = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.diagnosisListMap
    );
    diagnosisIdList = lodash.map(diagnosisListMap, (item) => item?.id);
    diagnosisCodeList = lodash
      .chain(diagnosisListMap)
      .map((item) => item?.diagnosisCode)
      .uniq()
      .compact()
      .value();
  }

  const response = yield call(retrieve3Cilndicator, diagnosisCodeList);
  if (response.success && response.resultData) {
    yield put({
      type: 'save3CiIndicator',
      payload: {
        diagnosis3CiIndicatorMap: response.resultData,
        diagnosisIdList,
      },
    });
  }
}
