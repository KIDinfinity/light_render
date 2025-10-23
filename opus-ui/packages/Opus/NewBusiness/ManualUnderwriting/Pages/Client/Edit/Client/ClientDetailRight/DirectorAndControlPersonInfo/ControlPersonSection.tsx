import React from 'react';
import styles from './index.less';
import ControlPersonItem from './ControlPersonItem';
import useGetControllingPersonList from '../../../../_hooks/useGetControllingPersonList';
import useAutoAddControllingPerson from '../../../../_hooks/useAutoAddControllingPerson';

export default ({ clientId }: any) => {
  const controllingPersonList = useGetControllingPersonList({ mode: 'edit' });
  useAutoAddControllingPerson({ clientId });

  return (
    <div className={styles.tableSection}>
      {controllingPersonList?.map((id: string) => {
        return <ControlPersonItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
