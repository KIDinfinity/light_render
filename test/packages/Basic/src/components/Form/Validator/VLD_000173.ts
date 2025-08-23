import { getRequiredVLD } from './VLDTool';

// 「病名を告げた時期-本人-告知有無」= 有 時此字段必填
export const VLD_000173 = getRequiredVLD('01');
