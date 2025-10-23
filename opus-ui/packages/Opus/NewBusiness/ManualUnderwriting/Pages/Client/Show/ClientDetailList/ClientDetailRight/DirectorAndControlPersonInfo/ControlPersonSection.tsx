import React from 'react';
import styles from './index.less';
import ControlPersonItem from './ControlPersonItem';
import useGetControllingPersonList from '../../../../_hooks/useGetControllingPersonList';

export default ({ clientId }: any) => {
  const controllingPersonList = useGetControllingPersonList({ mode: 'show' });

  return (
    <div className={styles.tableSection}>
      {controllingPersonList?.map((id: string) => {
        return <ControlPersonItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
