import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';

const getPendingDescription = (pendingMemoItem: any) => {
  if (tenant.isTH()) {
    return pendingMemoItem?.memoDesc;
  }
  const subTypeCode = pendingMemoItem?.pendingMemoSubInfoList?.[0]?.subTypeCode;

  const pendingDescription = subTypeCode
    ? formatMessageApi({ DropDown_ENV_MemoReasonDescription: subTypeCode })
    : pendingMemoItem?.memoDesc;

  return pendingDescription;
};

export default getPendingDescription;
