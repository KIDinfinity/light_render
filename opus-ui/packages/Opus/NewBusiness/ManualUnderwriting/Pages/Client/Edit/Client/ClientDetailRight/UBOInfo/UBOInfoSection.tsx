import React from 'react';
import styles from './index.less';
import UBOInfoItem from './UBOInfoItem';
import useGetUBOInfoList from '../../../../_hooks/useGetUBOInfoList';
import useAutoAddUBOInfo from '../../../../_hooks/useAutoAddUBOInfo';

export default ({ clientId }: any) => {
  const uboInfoList = useGetUBOInfoList({ mode: 'edit' });
  useAutoAddUBOInfo({ clientId });

  return (
    <div className={styles.tableSection}>
      {uboInfoList?.map((id: string) => {
        return <UBOInfoItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
