import lodash from 'lodash';

import claimRelationControllerService from '@/services/claimRelationControllerService';

export default function* refreshSerialTreatment(_: any, { select, call, put }: any) {
  const claimData = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);

  const { treatmentRelationshipSelectionList, treatmentRelationShipList } =
    claimData?.claimRelation || {};

  lodash.set(claimData, 'caseCategory', taskDetail.caseCategory);
  lodash.set(claimData, 'submissionChannel', taskDetail.submissionChannel);
  lodash.set(claimData, 'submissionDate', taskDetail.submissionDate);
  lodash.set(claimData, 'claimRelation', {
    treatmentRelationshipSelectionList,
    treatmentRelationShipList,
  });

  const response = yield call(claimRelationControllerService.refresh, claimData);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    yield put({
      type: 'saveTreatmentRelation',
      payload: { claimRelation: resultData },
    });

    yield put({
      type: 'getRelationTreatmentInfo',
      payload: { claimRelation: resultData },
    });

    return resultData;
  }
}
