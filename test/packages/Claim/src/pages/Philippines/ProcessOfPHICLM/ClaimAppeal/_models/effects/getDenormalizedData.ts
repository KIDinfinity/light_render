import { denormalizeClaimData } from '@/utils/claimUtils';

// 反扁平化（不清楚表单的校验数据）
export default function* (_: any, { select }: any) {
  const { claimProcessData, claimEntities } = yield select(
    (state: any) => state.PHCLMOfAppealCaseController
  );
  return denormalizeClaimData(claimProcessData, claimEntities);
}
