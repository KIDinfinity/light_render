import { serialize as objectToFormData } from 'object-to-formdata';
import { getCfgExclusion } from '@/services/miscCfgExclusionCodeControllerService';

export default function* (_, { call, put }: any) {
  const exclusionCluster = yield call(getCfgExclusion, objectToFormData({}));

  const exclusionList = exclusionCluster.filter(
    (item: { type: 'E' | 'D' | 'P' }) => item.type === 'E'
  );
  const dpList = exclusionCluster.filter(
    (item: { type: 'E' | 'D' | 'P' }) => item.type === 'D' || item.type === 'P'
  );
  const exclusionReasonList = exclusionCluster.filter((item: { type: 'R' }) => item.type === 'R');

  yield put({
    type: 'setExclusionList',
    payload: {
      exclusionList,
    },
  });
  yield put({
    type: 'setDPRemarkList',
    payload: {
      dpList,
    },
  });
  yield put({
    type: 'setExclusionReasonList',
    payload: {
      exclusionReasonList,
    },
  });
}
