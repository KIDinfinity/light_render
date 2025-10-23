import { validateIncludes } from '@/utils/validationsUtil';

// 当受付事案为P免时，保険料免除の事由可编辑并且为必须录入项目。
export const VLD_000082 = validateIncludes();
