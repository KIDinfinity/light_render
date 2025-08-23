import { validateIncludes } from '@/utils/validationsUtil';

// 受付事案为高障时，障害名field可以编辑且必须录入。
export const VLD_000124 = validateIncludes();
