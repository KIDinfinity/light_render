import { denormalizeClaimData } from '@/utils/claimUtils';
import { NAMESPACE } from '../../activity.config';

// 反扁平化（不清楚表单的校验数据）
export default function* (_: any, { select }: any) {
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  return denormalizeClaimData(claimProcessData, claimEntities);
}
