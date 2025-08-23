import { getRequiredVLD } from './VLDTool';

// 「CIN」＝「01, 02, 03」 時此字段必填
export const VLD_000172 = getRequiredVLD(
  ['01', '02', '03'],
  (dictCode: string[], checkValue: string) => dictCode.includes(checkValue)
);
