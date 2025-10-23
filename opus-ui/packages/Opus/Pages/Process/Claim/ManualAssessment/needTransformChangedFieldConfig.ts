import { splitBenefitTypeCode } from 'basic/utils/PolicyUtils';
const transformBenefitTypeCodeFunc = (value: string) => {
  let finalValue = value;
  finalValue = splitBenefitTypeCode(value)?.benefitTypeCode;
  return finalValue;
};
const needTransformChangedFieldList = [
  {
    path: 'claimPayableList.treatmentPayableList',
    fieldName: 'oldBenefitTypeCode',
    realFieldName: 'benefitTypeCode',
    realValueCalFunc: transformBenefitTypeCodeFunc,
  },
];
export default needTransformChangedFieldList;
