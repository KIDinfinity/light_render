import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from '../index.less';

// TODO:初始化不应该渲染
export default ({ clientId, NAMESPACE }: any) => {
  const {
    policyOwnerList = [],
    policyInsuredList = [],
    policyBeneficiaryList = [],
  } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.c360PolicyInfo
  ) || {};

  const roleList = useMemo(() => {
    return lodash
      .chain([
        {
          list: policyOwnerList,
          code: 'PolicyOwner',
        },
        {
          list: policyInsuredList,
          code: 'PolicyInsured',
        },
        {
          list: policyBeneficiaryList,
          code: 'Beneficiary',
        },
      ])
      .reduce((arr: any, { list, code }: any) => {
        const hasRole = list?.some((client) => client.clientId === clientId);
        return hasRole ? [...arr, code] : arr;
      }, [])
      .value();
  }, [policyOwnerList, policyInsuredList, policyBeneficiaryList]);

  return (
    <div className={styles.payeeItemWrap}>
      {lodash.map(roleList, (code, index) => (
        <div className={styles.title} key={code + index}>
          {formatMessageApi({ Label_BIZ_Policy: code })}
        </div>
      ))}
    </div>
  );
};
