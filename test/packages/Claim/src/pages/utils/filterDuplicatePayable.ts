export const filterDuplicatePayable = (
  payableItem: any,
  editPayable: any,
  benefitItemCode?: any
) => {
  let result =
    payableItem.policyNo === editPayable.policyNo &&
    payableItem.productCode === editPayable.productCode &&
    payableItem.policyYear === editPayable.policyYear &&
    payableItem.benefitTypeCode === editPayable.benefitTypeCode;

  if (benefitItemCode) {
    result = result && payableItem.benefitItemCode === benefitItemCode;
  }
  return result;
};

export default filterDuplicatePayable;
