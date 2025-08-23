import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';
import { formUtils } from 'basic/components/Form';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import { diffTime } from 'process/GeneralPOS/common/utils';

export default function useCheckEffectiveDate() {
  const transactionTypesId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.transactionTypes?.[0]
  );
  const effectiveDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionTypesId]?.effectiveDate
  );
  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionTypesId]?.transactionTypeCode
  );

  const effectiveDateValue = formUtils.queryValue(effectiveDate);

  const prevEffectiveDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.prevEffectiveDate
  );

  const result = useMemo(
    () =>
      [TransactionTypeEnum.SRV003, TransactionTypeEnum.SRV006, TransactionTypeEnum.SRV011].includes(
        formUtils.queryValue(transactionTypeCode)
      ) && diffTime(effectiveDateValue, prevEffectiveDate),
    [effectiveDateValue, prevEffectiveDate, transactionTypeCode]
  );

  return result;
}
