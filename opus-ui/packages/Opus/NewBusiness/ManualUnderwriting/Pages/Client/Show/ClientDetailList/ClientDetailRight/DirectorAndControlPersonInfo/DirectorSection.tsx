import React from 'react';
import DirectorItem from './DirectorItem';
import styles from './index.less';
import { ReactComponent as CareerIcon } from 'opus/Assets/career.svg';
import useGetDirectorList from '../../../../_hooks/useGetDirectorList';
export default ({ clientId }: any) => {
  const directorList = useGetDirectorList({ mode: 'show' });

  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <CareerIcon />
        </div>
      </div>
      {directorList?.map((id: string) => {
        return <DirectorItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
