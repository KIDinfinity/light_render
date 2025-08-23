import { getRequiredVLD } from './VLDTool';

// "抗がん剤治療-有無" = 「有」时为必填
export const VLD_000216 = getRequiredVLD('01');
