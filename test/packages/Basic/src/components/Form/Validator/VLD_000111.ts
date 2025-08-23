// 当脳卒中の場合60日後遺症継続为はい时，脳卒中の場合，後遺症を記入为必须填写可编辑项目。
export const VLD_000111 = (form: any) => form.getFieldValue('sequelaeOfStroke') === '01';
