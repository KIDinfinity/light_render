import { useEffect } from 'react';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import useGetbankInfoIndex from 'process/NB/ManualUnderwriting/_hooks/useGetbankInfoIndex';
import useGetBankInfoFieldData from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldData';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  const bankCodeFilterArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankCodeFilterArray,
    shallowEqual
  );

  const factoringHousesList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.factoringHousesList,
    shallowEqual
  );
  const bankInfoIndex = useGetbankInfoIndex({ type: BankInfoType.Renewal });
  const renewalPaymentBankInfoTableData = useGetBankInfoFieldData({ type: BankInfoType.Renewal });

  return useEffect(() => {
    const bankCode = formUtils.queryValue(renewalPaymentBankInfoTableData?.bankCode);
    if (
      lodash.size(bankCodeFilterArray) &&
      !lodash.isEmpty(bankCode) &&
      !lodash.includes(bankCodeFilterArray, bankCode)
    ) {
      dispatch({
        type: `${NAMESPACE}/setBankInfoFieldData`,
        payload: {
          bankInfoIndex,
          changedFields: {
            bankCode: '',
          },
          factoringHousesList: factoringHousesList || [],
          bankInfoType: BankInfoType.Renewal,
        },
      });
    }
  }, [bankCodeFilterArray]);
};
