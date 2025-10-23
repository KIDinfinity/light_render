// 当报告者为非被保险者时，为必须填写项目。
export const VLD_000081 = (form: any) => !form.getFieldValue('claimant') === '02';
