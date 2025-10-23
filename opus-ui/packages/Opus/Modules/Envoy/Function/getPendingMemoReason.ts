import { formatMessageApi } from '@/utils/dictFormatMessage';

const getPendingMemoReason = (pendingMemoItem: any) => {
  const subTypeCode = pendingMemoItem?.pendingMemoSubInfoList?.[0]?.subTypeCode;

  const memoReason = formatMessageApi({ DropDown_ENV_MemoReasonDescription: subTypeCode });

  return memoReason;
};

export default getPendingMemoReason;
