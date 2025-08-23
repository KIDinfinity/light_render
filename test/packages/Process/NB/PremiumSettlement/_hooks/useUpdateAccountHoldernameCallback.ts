import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import CustomerRole from 'basic/enum/CustomerRole';
import AccountHolderType from 'process/NB/Enum/AccountHolderType';
import useGetClientNameConfig from 'process/NB/PremiumSettlement/_hooks/useGetClientNameConfig';
import DefaultValueConfig from 'process/NB/Enum/DefaultValueConfig';
import DefaultNameType from 'process/NB/Enum/DefaultNameType';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const clientInfoList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.businessData.policyList[0].clientInfoList;
  });
  const cfgRegionalDefaultValueList = useGetClientNameConfig();
  return useCallback(
    (accountHolderType: any) => {
      const defaultNameType = lodash
        .chain(cfgRegionalDefaultValueList)
        .find((item) => item.codeType === DefaultValueConfig.ClientName)
        .get('defaultValue')
        .value();
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
            const key = defaultNameType === DefaultNameType.LocalName ? 'name' : 'customerEnName';
            return lodash.get(clientInfo, key) || '';
          })();
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveBankSection',
            payload: {
              changedFields: {
                bankAcctName: name,
              },
              id,
            },
          });
        },
        notMatch: null,
      });
    },
    [clientInfoList, cfgRegionalDefaultValueList]
  );
};
