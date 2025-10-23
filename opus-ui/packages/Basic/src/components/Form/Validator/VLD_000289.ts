import { formUtils } from 'basic/components/Form';

// checked，不能都不填
export const VLD_000289 = (usTaxDeclarations: any) => {
  const usTax = formUtils.cleanValidateData(usTaxDeclarations);

  return usTax?.checked && !usTax?.cardNo && !usTax?.identificationNumber ? [{}] : [];
};
