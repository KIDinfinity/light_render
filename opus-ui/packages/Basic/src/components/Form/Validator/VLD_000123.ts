import { validateIncludes } from '@/utils/validationsUtil';

// 受付事案为高障时，高度障害コードfield可以编辑且必须录入。
export const VLD_000123 = validateIncludes();
