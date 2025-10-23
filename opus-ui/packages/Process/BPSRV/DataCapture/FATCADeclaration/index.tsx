import React from 'react';
import { useSelector } from "dva";
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import List from './List';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const FATCADeclaration = () => {


  const isShowFATCADeclaration = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowFATCADeclaration
  );

  const list = isShowFATCADeclaration ?
    (<div className={styles.FATCADeclaration}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_SRV: 'FATCADeclaration',
        })}
      >
        <List />
      </FormAntCard>
    </div>)
    :
    (<></>)

  return (
    <>
      {list}
    </>
  );
};

export default FATCADeclaration;
