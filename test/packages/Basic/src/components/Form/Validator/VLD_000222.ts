import { getRequiredVLD } from './VLDTool';

// 「年金受取方法-受取区分」＝「03, 04, 05, 06」 時此字段必填
export const VLD_000222 = getRequiredVLD(
  ['03', '04', '05', '06'],
  (dictCode: string[], checkValue: string) => dictCode.includes(checkValue)
);
