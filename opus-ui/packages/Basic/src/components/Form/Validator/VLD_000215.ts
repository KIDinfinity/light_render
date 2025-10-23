import { getRequiredVLD } from './VLDTool';

// 仅当书类为M8304 (010) 时为必填
export const VLD_000215 = getRequiredVLD('00010');
