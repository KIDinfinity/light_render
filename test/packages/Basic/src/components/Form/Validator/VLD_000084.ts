import { validateIncludes } from '@/utils/validationsUtil';

// 受付事案为死亡时，死因field可编辑,并且必须录入。
export const VLD_000084 = validateIncludes();
