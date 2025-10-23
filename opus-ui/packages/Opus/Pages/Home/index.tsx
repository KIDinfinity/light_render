import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import MyTask from './Tabs/MyTask';
import { useOutletContext } from 'umi';
import MyTeamTask from './Tabs/MyTeamTask';

import styles from './index.less';

const UserName = () => {
  const userName = useSelector(({ user }: any) => user?.currentUser?.userName) || '';
  return (
    <div className={styles.userName}>{formatMessageApi({ Label_COM_Opus: 'Hello' }, userName)}</div>
  );
};

const Main = () => {
  const { tabKey } = useOutletContext();
  return (
    <div className={styles.main}>
      <UserName />
      {tabKey === 'myTask' && <MyTask tabKey={tabKey} />}
      {tabKey === 'myTeamTask' && <MyTeamTask tabKey={tabKey} />}
    </div>
  );
};

export default Main;
