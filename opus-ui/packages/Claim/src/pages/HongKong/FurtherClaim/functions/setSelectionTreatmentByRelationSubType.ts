import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const getRelationSubTypeByTreatment = ({ treatmentItem, infoItem, claimData }: any) => {
  const treatmentSystemRelationshipList =
    formUtils.cleanValidateData(
      claimData?.claimProcessData?.claimRelation?.treatmentSystemRelationshipList
    ) || [];

  return (
    lodash
      .chain(treatmentSystemRelationshipList)
      .find((refreshItem) => {
        return (
          infoItem?.id === refreshItem?.relaTreatmentId &&
          treatmentItem?.treatmentId === refreshItem?.treatmentId
        );
      })
      .value()?.relationSubType || null
  );
};

export const setSelectionTreatmentByRelationSubType = ({
  claimData,
  getSelectionTreatments,
}: any) => {
  return (
    lodash.map(getSelectionTreatments, (treatmentItem: any) => {
      return {
        ...treatmentItem,
        treatmentInfos: lodash.map(treatmentItem?.treatmentInfos, (infoItem: any) => {
          return {
            ...infoItem,
            relationSubType: getRelationSubTypeByTreatment({ treatmentItem, infoItem, claimData }),
          };
        }),
      };
    }) || []
  );
};
