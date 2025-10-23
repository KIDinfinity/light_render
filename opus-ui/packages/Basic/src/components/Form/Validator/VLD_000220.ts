import { getRequiredVLD } from './VLDTool';

// 支払方法 仅在书类为022与023时为必填
export const VLD_000220 = getRequiredVLD(
  ['00022', '00023'],
  (documentTypeCode: string[], checkValue: string) => documentTypeCode.includes(checkValue)
);
