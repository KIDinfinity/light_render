import lodash from 'lodash';
import { getSelectionTreatment, getRelationTreatment, combineTreatmentInfo, setSelectionTreatmentByRelationSubType } from '.';
import { tenant, Region } from '@/components/Tenant';

export const generateSerialTreatment = (
  claimData: any,
  serialTreatmentInfo2BE: any[],
  taskDetail: any,
  treatmentId?: string
) => {
  let serialTreatmentInfo = serialTreatmentInfo2BE;

  if (tenant.isJP()) {
    const treatmentPayableItemId =
      claimData?.saveFurtherClaimRelationshipId?.treatmentPayableItemId;
    const { policyNo: policyId, treatmentId }: any = lodash.pick(
      claimData.claimEntities?.treatmentPayableListMap?.[treatmentPayableItemId],
      ['policyNo', 'treatmentId']
    );
    serialTreatmentInfo = lodash.find(serialTreatmentInfo2BE, { policyId })?.relatedTreatmentList;
    return [
      {
        treatmentId,
        treatmentInfos: lodash.map(serialTreatmentInfo, (item) => ({ ...item, followUp: 'N' })),
      },
    ];
  }

  const selectionTreatments = getSelectionTreatment(claimData, treatmentId);

  const combineSelectionTreatmentInfo = combineTreatmentInfo(
    claimData,
    selectionTreatments,
    serialTreatmentInfo,
    taskDetail
  );

  const getSelectionTreatments = getRelationTreatment(
    claimData,
    combineSelectionTreatmentInfo,
    serialTreatmentInfo,
    taskDetail
  );

  return tenant.region() === Region.HK ? setSelectionTreatmentByRelationSubType({ claimData, getSelectionTreatments }) : getSelectionTreatments
};
