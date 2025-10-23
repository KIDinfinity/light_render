import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const calcTreatmentTypeOK = (detail: any, treatmentType: any) => {
  const claimTypeList = formUtils.queryValue(detail.claimTypeArray);
  const isHintNameRequest = claimTypeList?.includes(treatmentType);
  let hasThisTreatment = false;
  lodash.map(detail?.treatmentList, (v) => {
    if (v?.treatmentType?.value === treatmentType || v?.treatmentType === treatmentType) {
      hasThisTreatment = true;
    }
  });

  const isOK = isHintNameRequest ? hasThisTreatment : true;

  // 验证通过的话
  const result = isOK
    ? { message: `${treatmentType}: 验证通过`, isOK }
    : { message: `${treatmentType}: 验证不通过`, isOK };

  return result;
};

const checkTreatmentTypeOK = (detail: any, treatmentType: any, treatmentListMap: any) => {
  const claimTypeList = formUtils.queryValue(detail?.claimTypeArray);
  const isHintNameRequest = claimTypeList?.includes(treatmentType);
  let hasThisTreatment = false;
  lodash.map(detail?.treatmentList, (id) => {
    const treatmentItem = treatmentListMap[id];
    if (
      treatmentItem?.treatmentType?.value === treatmentType ||
      treatmentItem?.treatmentType === treatmentType
    ) {
      hasThisTreatment = true;
    }
  });

  const isOK = isHintNameRequest ? hasThisTreatment : true;

  // 验证通过的话
  const result = isOK
    ? { message: `${treatmentType}: 验证通过`, isOK }
    : { message: `${treatmentType}: 验证不通过`, isOK };

  return result;
};

const checkCriticalIllness = (detail: any) => {
  const claimTypeList = formUtils.queryValue(detail.claimTypeArray);
  const isCriticalIllnessRequest = claimTypeList?.includes('CI');
  let hasCriticalIllness = false;
  lodash.map(detail.diagnosisList, (item) => {
    if (item?.criticalIllness === 1) {
      hasCriticalIllness = true;
    }
  });

  return isCriticalIllnessRequest ? hasCriticalIllness : true;
};

export default {
  calcTreatmentTypeOK,
  checkCriticalIllness,
  checkTreatmentTypeOK,
};
