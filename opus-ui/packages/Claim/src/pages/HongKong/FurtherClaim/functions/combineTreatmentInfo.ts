import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getCurrentSerialTreamentInfo } from '.';

/**
 *
 * @param claimData
 * @param relationTreatments
 * @param serialTreatmentInfo2BE
 * @param taskDetail
 * @returns
 */
export const combineTreatmentInfo = (
  claimData: any,
  relationTreatments: any[] | undefined,
  serialTreatmentInfo2BE: any[],
  taskDetail: any
) => {
  const { treatmentListMap } = formUtils.cleanValidateData(claimData?.claimEntities) || {};

  const serialTreatmentInfo2Page = getCurrentSerialTreamentInfo(claimData, taskDetail);

  const currentTreatmentIds = lodash.keys(treatmentListMap);

  return lodash
    .chain(relationTreatments)
    .map((relationTreatment: any) => {
      const fromPage = currentTreatmentIds.includes(relationTreatment.relaTreatmentId);
      let relationWithInfo: any = {};

      if (fromPage) {
        relationWithInfo = lodash.find(serialTreatmentInfo2Page, {
          treatmentId: relationTreatment.relaTreatmentId,
        });
      } else {
        relationWithInfo = lodash.find(serialTreatmentInfo2BE, {
          treatmentId: relationTreatment.relaTreatmentId,
        });
      }

      relationWithInfo = { ...relationWithInfo };

      if (!lodash.isEmpty(relationWithInfo)) {
        const treatmentInfoId = relationWithInfo.treatmentId;
        relationWithInfo.treatmentInfoId = treatmentInfoId;
        delete relationWithInfo.treatmentId;
      } else {
        relationWithInfo.isEmpty = true;
      }

      //合并数据后，treatmentId为当前claim页面treatment的id，relaTreatmentId为当前选中的relationship treatment的id
      return {
        ...relationTreatment,
        ...relationWithInfo,
        partyId: taskDetail?.partyId,
        customerType: taskDetail?.customerType,
        businessNo: taskDetail?.businessNo,
        caseCategory: taskDetail?.caseCategory,
        key: `${relationTreatment.treatmentId}~${relationTreatment?.relaTreatmentId}`,
      };
    })
    .compact()
    .filter((item: any) => {
      return !item?.isEmpty;
    })
    .value();
};
