import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { combineTreatmentInfo } from '.';

export const getRelationTreatment = (
  claimData: any,
  selectTreatments: any[] | undefined,
  serialTreatmentInfo2BE: any[],
  taskDetail: any
) => {
  if (lodash.isEmpty(claimData) || lodash.isEmpty(selectTreatments)) return;

  const { claimRelation } = formUtils.cleanValidateData(claimData?.claimProcessData) || {};
  const { allTreatmentRelationShipList } = claimRelation || {};

  return lodash
    .chain(selectTreatments)
    .compact()
    .map((selectTreatment: any, index: number) => {
      const odd = index % 2 === 1;
      const treatmentRelations = lodash.filter(
        allTreatmentRelationShipList,
        (treatmentRelation: any) =>
          treatmentRelation.treatmentId === selectTreatment.relaTreatmentId &&
          treatmentRelation.relaTreatmentId !== selectTreatment.relaTreatmentId
      );

      const combineSelectionTreatmentInfo = combineTreatmentInfo(
        claimData,
        treatmentRelations,
        serialTreatmentInfo2BE,
        taskDetail
      );

      return {
        treatmentId: selectTreatment.treatmentId,
        treatmentInfos: [selectTreatment].concat(combineSelectionTreatmentInfo).map((item: any) => {
          if (!lodash.has(item, 'followUp'))
            return { ...item, className: odd ? 'oddBg hideCheckbox' : 'evenBg hideCheckbox' };

          return { ...item, className: odd ? 'oddBg' : 'evenBg' };
        }),
      };
    })
    .value();
};
