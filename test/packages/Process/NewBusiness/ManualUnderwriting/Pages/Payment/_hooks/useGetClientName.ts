import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import AccountHolderType from 'process/NB/Enum/AccountHolderType';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { tenant } from '@/components/Tenant';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import DefaultValueConfig from 'process/NewBusiness/Enum/DefaultValueConfig';
import DefaultNameType from 'process/NewBusiness/Enum/DefaultNameType';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 过程
 * 1. 只在kh处理
 * 2. 获取clientInfoItem(通过)
 * 3. 获取typeCode
 * 4. 获取需要pick的列表
 * 5. 组装name,存数据
 */

export default ({ id, accountHolderType, isDefault = true }: any) => {
  const dispatch = useDispatch();

  if (!tenant.isKH()) return;

  const clientMap =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.clientMap) || {};
  const cfgRegionalDefaultValueList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.cfgRegionalDefaultValueList
  );

  const defaultNameType = lodash.find(cfgRegionalDefaultValueList, {
    codeType: DefaultValueConfig.ClientName,
  })?.defaultValue;

  const roleConfig = {
    [AccountHolderType.LI_NAME]: CustomerRole.Insured,
    [AccountHolderType.PO_NAME]: CustomerRole.PolicyOwner,
    [AccountHolderType.OTHER]: '',
  };
  const clientInfoItem = lodash
    .chain(lodash.values(clientMap))
    .find(({ roleList }: any) =>
      lodash.some(
        roleList,
        ({ customerRole }: any) => customerRole === roleConfig?.[accountHolderType]
      )
    )
    .value();

  const sectionConfig = useGetSectionAtomConfig({
    section: 'CommonClientInfo-Field',
    localConfig: {},
  });

  const tileDropdownTypeCode = lodash
    .chain(sectionConfig)
    .find((fieldItem: any) => fieldItem?.field === 'title')
    .get('field-props.x-dict.dictTypeCode')
    .value();

  return useCallback(() => {
    const DEFAULTLOCAL = ['firstName', 'middleName', 'surname', 'extensionName'];
    const DEFAULTENGLISH = [
      'customerEnFirstName',
      'customerEnFiddleName',
      'customerEnSurname',
      'customerEnExtensionName',
    ];

    const keyList = [];
    if (isDefault) {
      if (defaultNameType === DefaultNameType.LocalName) {
        keyList.push(...DEFAULTLOCAL);
      }
      if (defaultNameType === DefaultNameType.EnglishName) {
        keyList.push(...DEFAULTENGLISH);
      }
    } else {
      if (defaultNameType === DefaultNameType.LocalName) {
        keyList.push(...DEFAULTENGLISH);
      }
      if (defaultNameType === DefaultNameType.EnglishName) {
        keyList.push(...DEFAULTLOCAL);
      }
    }

    const bankAcctName = lodash
      .chain(clientInfoItem)
      .pick(keyList)
      .entries()
      .map(([k, v]: any) => {
        if (k === 'title') {
          return formatMessageApi({
            [tileDropdownTypeCode]: v,
          });
        }
        return v;
      })
      .filter((item) => !!item)
      .join(' ')
      .value();

    dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: 'saveBankInfo',
      payload: {
        changedFields: {
          bankAcctName,
        },

        id,
      },
    });
  }, [defaultNameType, clientInfoItem, tileDropdownTypeCode]);
};
