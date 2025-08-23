import { getRequiredVLD } from './VLDTool';

// "緩和ケア診療等の入院-有無" = 「有」时为必填
export const VLD_000219 = getRequiredVLD('01');
