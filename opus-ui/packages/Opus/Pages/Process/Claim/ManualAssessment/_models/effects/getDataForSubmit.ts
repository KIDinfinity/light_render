import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';

export default function* (action, { select }) {
  const { claimProcessData, claimEntities, popupData } = yield select(
    (state) => state.opusClaimAssessment
  );

  let denormalizedData;

  if (action?.payload?.isPopup) {
    const incidentId = popupData.incidentId;

    const incidentListMap = {
      ...claimEntities.incidentListMap,
      [incidentId]: {
        ...claimEntities.incidentListMap[incidentId],
        klipCaseInfoList: popupData.klipCaseInfoList,
      },
    };
    denormalizedData = denormalizeClaimData(claimProcessData, {
      ...claimEntities,
      incidentListMap,
      procedureListMap: popupData.procedureListMap,
      treatmentListMap: popupData.treatmentListMap,
    });
  } else {
    denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  }
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  if (lodash.isEmpty(claimData)) return {};
  return {
    ...claimData,
    refundAmount: claimProcessData?.refundAmount || {},
  };
}
