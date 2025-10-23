import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import NewClientFlag from 'opus/NewBusiness/ManualUnderwriting/_enum/NewClientFlag';
import styles from './index.less';

const NewClientFlagC = ({ clientId }: any) => {
  const newClientFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.newClientFlag
  );

  return (
    <>
      {newClientFlag === NewClientFlag.New && (
        <span className={styles.status}>
          {formatMessageApi({
            Dropdown_IND_NewClientFlag: newClientFlag,
          })}
        </span>
      )}
    </>
  );
};

NewClientFlagC.displayName = 'newClientFlag';

export default NewClientFlagC;
