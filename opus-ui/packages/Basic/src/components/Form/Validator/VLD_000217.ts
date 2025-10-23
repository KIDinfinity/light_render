import { getRequiredVLD } from './VLDTool';

// "ホルモン剤治療-有無" = 「有」时为必填
export const VLD_000217 = getRequiredVLD('01');
