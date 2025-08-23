// 当集中治疗为‘有’时，開始日field可编辑，并且必须录入。
export const VLD_000090 = (form: any) => form.getFieldValue('icu') === true;
