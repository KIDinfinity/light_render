// 当报告者为 その他时，申出者可编辑，并且为必须填写项目。
export const VLD_000080 = (form: any) => form.getFieldValue('claimant') === '99';
