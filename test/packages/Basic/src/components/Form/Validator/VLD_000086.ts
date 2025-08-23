// 病理組織学的検査为‘有’时，診断確定日field可编辑，并且必须录入。
export const VLD_000086 = (form: any) => form.getFieldValue('diagnosticPathology') === true;
