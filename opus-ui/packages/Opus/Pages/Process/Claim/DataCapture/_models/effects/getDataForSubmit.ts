import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '../../utils/normalizrUtils';

import { calcAge } from '@/utils/utils';

// 这个是为了解决age为空的问题(找不到生产环境为什么为空，做的一次patch)
const setAge = ({ claimData: { insured, claimant }, submissionDate }: any) => {
  if ((!insured?.age || !claimant?.age) && !!insured?.dateOfBirth && !!submissionDate) {
    const age = calcAge(insured?.dateOfBirth, submissionDate);

    return {
      insured: {
        ...insured,
        age,
      },
      claimant: {
        ...claimant,
        age: age,
      },
    };
  }

  return {};
};

export default function* getDataForSubmit({ payload }: any, { select }) {
  const { claimProcessData, claimEntities, taskDetail } = yield select((state) => ({
    claimProcessData: state.opusClaimDataCapture.claimProcessData,
    claimEntities: state.opusClaimDataCapture.claimEntities,
    taskDetail: state.processTask.getTask,
  }));
  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);

  let denormalizedData;

  const {
    show = false,
    incidentId,
    klipCaseInfoList,
    procedureListMap,
    treatmentListMap,
  } = payload?.popupData || {};
  if (!!show) {
    const incidentListMap = {
      ...claimEntities.incidentListMap,
      [incidentId]: {
        ...claimEntities.incidentListMap[incidentId],
        klipCaseInfoList,
      },
    };
    denormalizedData = denormalizeClaimData(claimProcessData, {
      ...claimEntities,
      incidentListMap,
      procedureListMap,
      treatmentListMap,
    });
  } else {
    denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  }

  const claimData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(denormalizedData)
  );
  if (lodash.isEmpty(claimData)) return {};

  const dataForSubmit = {
    ...claimData,
    ...setAge({ claimData, submissionDate: taskDetail?.submissionDate || null }),
    activityKey: taskDefKey,
    taskId,
    processInstanceId,
    assessmentType,
  };
  return dataForSubmit;
}
