import React from 'react';
import styles from './index.less';
import UBOInfoItem from './UBOInfoItem';
import useGetUBOInfoList from '../../../../_hooks/useGetUBOInfoList';

export default ({ clientId }: any) => {
  const uboInfoList = useGetUBOInfoList({ mode: 'show' });

  return (
    <div className={styles.tableSection}>
      {uboInfoList?.map((id: string) => {
        return <UBOInfoItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
