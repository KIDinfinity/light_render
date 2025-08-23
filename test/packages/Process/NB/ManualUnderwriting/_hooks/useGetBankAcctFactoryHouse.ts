import { useEffect } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import { useDispatch } from 'dva';
import useGetBankInfoFieldData from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldData';
import useGetbankInfoIndex from 'process/NB/ManualUnderwriting/_hooks/useGetbankInfoIndex';
import BankInfoType from 'process/NB/Enum/BankInfoType';

export default () => {
  const dispatch = useDispatch();
  const renewalPaymentBankInfoTableData = useGetBankInfoFieldData({ type: BankInfoType.Renewal });
  const bankInfoIndex = useGetbankInfoIndex({ type: BankInfoType.Renewal });
  const specificCfgFactoringHouseList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.specificCfgFactoringHouseList,
    shallowEqual
  );
  const factoringHousesList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.factoringHousesList,
    shallowEqual
  );
  const policyList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.policyList?.[0],
    shallowEqual
  );

  const businessBankCode = formUtils.queryValue(
    lodash.get(renewalPaymentBankInfoTableData, 'businessBankCode')
  );
  const bankCode = formUtils.queryValue(lodash.get(renewalPaymentBankInfoTableData, 'bankCode'));
  const renewalPayType = formUtils.queryValue(lodash.get(policyList, 'renewalPayType'));
  const currencyCode = formUtils.queryValue(lodash.get(policyList, 'currencyCode'));

  return useEffect(() => {
    let factoringHousesFilter = [];
    if (!lodash.isEmpty(businessBankCode)) {
      factoringHousesFilter = lodash.find(
        specificCfgFactoringHouseList,
        (item: any) =>
          item.businessBankCode === businessBankCode &&
          item.renewalPayType === renewalPayType &&
          item.currencyCode === currencyCode
      );
    } else if (!lodash.isEmpty(bankCode)) {
      factoringHousesFilter = lodash.find(
        specificCfgFactoringHouseList,
        (item: any) => item.bankCode === bankCode && item.renewalPayType === renewalPayType
      );
    }
    if (!lodash.isEmpty(factoringHousesFilter)) {
      dispatch({
        type: `${NAMESPACE}/setBankInfoFieldData`,
        payload: {
          bankInfoIndex,
          changedFields: {
            bankCode: lodash.get(factoringHousesFilter, 'bankCode'),
            bankAcctFactoryHouse: lodash.get(factoringHousesFilter, 'factoringHouse'),
            bankAcctType: lodash.get(factoringHousesFilter, 'acctType'),
          },
          factoringHousesList: factoringHousesList || [],
          bankInfoType: BankInfoType.Renewal,
        },
      });
    }
  }, [businessBankCode, bankCode, currencyCode, renewalPayType]);
};
