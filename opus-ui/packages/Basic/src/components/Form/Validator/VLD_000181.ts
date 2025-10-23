import { getRequiredVLD } from './VLDTool';

// 「先進医療有無」=「あり」时此字段變爲必填 001
export const VLD_000181 = getRequiredVLD('01');
