import { tenant, Region } from '@/components/Tenant';

const getPaddingCode = (pendingMemoItem: any) => {
  const subTypeCode = pendingMemoItem?.pendingMemoSubInfoList?.[0]?.subTypeCode;
  const regionCode = tenant.region();
  const pendingCode =
    subTypeCode && regionCode === Region.JP
      ? `${pendingMemoItem?.memoCode || ''}-${pendingMemoItem?.memoDesc || ''}`
      : pendingMemoItem?.memoCode || '';

  return pendingCode;
};

export default getPaddingCode;
