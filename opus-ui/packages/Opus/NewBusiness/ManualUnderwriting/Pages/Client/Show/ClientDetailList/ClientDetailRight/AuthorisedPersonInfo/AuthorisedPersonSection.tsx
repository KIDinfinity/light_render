import React from 'react';

import AuthorisedPersonItem from './AuthorisedPersonItem';
import styles from './index.less';
import { ReactComponent as CareerIcon } from 'opus/Assets/career.svg';
import useGetAuthorizedPersonList from '../../../../_hooks/useGetAuthorisedPersonList';

export default ({ clientId }: any) => {
  const authorisedPersonList = useGetAuthorizedPersonList({ mode: 'show' });

  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <CareerIcon />
        </div>
      </div>
      {authorisedPersonList?.map((id: string) => {
        return <AuthorisedPersonItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
