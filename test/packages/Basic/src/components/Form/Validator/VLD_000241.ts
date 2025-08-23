import { getRequiredVLD } from './VLDTool';

// 「年金受取方法-受取区分」＝「04,  06」 時此字段必填
export const VLD_000241 = getRequiredVLD(['04', '06'], (dictCode: string[], checkValue: string) =>
  dictCode.includes(checkValue)
);
