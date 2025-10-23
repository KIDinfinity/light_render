import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import useGetbankInfoIndex from 'process/NB/ManualUnderwriting/_hooks/useGetbankInfoIndex';
import useGetBankInfoFieldData from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldData';
import lodash from 'lodash';
import CustomerRole from 'basic/enum/CustomerRole';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';
import AccountHolderType from 'process/NB/Enum/AccountHolderType';

export default () => {
  const dispatch = useDispatch();
  const renewalPaymentBankIInfoIndex = useGetbankInfoIndex({ type: BankInfoType.Renewal });
  const renewalPaymentBankInfoTableData = useGetBankInfoFieldData({ type: BankInfoType.Renewal });
  const factoringHousesList = lodash.get(NAMESPACE, 'factoringHousesList', []);
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  const clientInfoList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.businessData?.policyList[0].clientInfoList || [];
  });
  return useCallback(
    (accountHolderType: any) => {
      tenant.region({
        [Region.KH]: () => {
          let matchRole = '';
          switch (accountHolderType) {
            case AccountHolderType.LI_NAME:
              matchRole = CustomerRole.Insured;
              break;
            case AccountHolderType.PO_NAME:
              matchRole = CustomerRole.PolicyOwner;
              break;
            case AccountHolderType.OTHER:
              matchRole = '';
              break;
            default:
              break;
          }

          const name = (() => {
            const clientInfo = lodash
              .chain(clientInfoList)
              .find((clientItem: any) => {
                return lodash
                  .chain(clientItem)
                  .get('roleList', [])
                  .some((roleItem: any) => roleItem?.customerRole === matchRole)
                  .value();
              })
              .value();
            return handleGetDefaultClientName({ clientInfo });
          })();
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setBankInfoFieldData',
            payload: {
              changedFields: {
                bankAcctName: name,
              },
              factoringHousesList,
              bankInfoType: 'R',
              bankInfoIndex: renewalPaymentBankIInfoIndex,
              id: renewalPaymentBankInfoTableData?.id,
            },
          });
        },
        notMatch: null,
      });
    },
    [clientInfoList]
  );
};
