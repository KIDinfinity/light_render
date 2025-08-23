import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetCoverageRoleList from '../_hooks/useGetCoverageRoleList';
import TsarBreakDownListSetion from './TsarBreakDownListSetion';
import styles from './index.less';

const TsarCard = () => {
  const roleList = useGetCoverageRoleList({displayStyle: 'right'});
  if (!lodash.isEmpty(roleList)) {
    return lodash.map(roleList, (role) => (
      <div className={styles.tsarCard} key={role}>
        <div className={styles.customerRole}>
          {formatMessageApi({ Dropdown_CLM_CustomerRole: role })}
        </div>
        <TsarBreakDownListSetion role={role} />
      </div>
    ));
  } else {
    return <></>;
  }
};

export default TsarCard;
