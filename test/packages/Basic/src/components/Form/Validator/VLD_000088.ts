// 当治療タイプ为01 入院 时，入院日field可编辑，并且必须录入。
export const VLD_000088 = (form: any) => form.getFieldValue('treatmentType') === 'IP';
