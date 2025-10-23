import { getRequiredVLD } from './VLDTool';

// 受取区分 字段仅在书类为069时为必填
export const VLD_000221 = getRequiredVLD('00069');
