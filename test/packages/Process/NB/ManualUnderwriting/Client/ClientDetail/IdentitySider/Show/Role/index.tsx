import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import classnames from 'classnames';

const Role = ({ item }: any) => {
  const hasJointLife = useSelector((state) => {
    return state[NAMESPACE].businessData.policyList?.some((policy) =>
      policy.coverageList?.some((coverage) =>
        coverage?.coverageInsuredList?.some(
          (coverageInsured) =>
            Number(coverageInsured?.unionInsuredSeqNum) > 1 && coverageInsured?.clientId === item.id
        )
      )
    );
  });

  return (
    <div className={styles.roles}>
      {lodash.map(item?.roleList, (role: any) => {
        if (role.customerRole === 'CUS001' && hasJointLife) {
          return (
            <div className={classnames(styles.role, styles.jointLife)} key={role.id}>
              {formatMessageApi({
                Dropdown_CLM_CustomerRole: 'CUS001',
              })}
              <span className={styles.jointLifeRole}>
                (
                {formatMessageApi({
                  Dropdown_POL_InsuredRole: 'UI',
                })}
                )
              </span>
            </div>
          );
        }
        return (
          <div className={styles.role} key={role.id}>
            {formatMessageApi({
              Dropdown_CLM_CustomerRole: role.customerRole,
            })}
          </div>
        );
      })}
    </div>
  );
};

Role.displayName = 'role';

export default Role;
