import { getRequiredVLD } from './VLDTool';

// "がん性疼痛緩和薬-有無" = 「有」时为必填
export const VLD_000218 = getRequiredVLD('01');
