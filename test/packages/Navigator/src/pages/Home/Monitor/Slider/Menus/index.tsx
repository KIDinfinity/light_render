import React from 'react';
import lodash from 'lodash';
import { MenuEnum } from './enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './Item';
import useHandleSelectMenu from '../hooks/useHandleSelectMenu';
import Authorized from '@/utils/Authorized';
import styles from './index.less';
import { useSelector } from 'dva';

export default () => {
  const handleSelect = useHandleSelectMenu();
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const list = commonAuthorityList
    .filter((item: any) => item.result)
    .map((item: any) => item.authorityCode);

  return (
    <div className={styles.container}>
      {lodash.map(
        [
          {
            code: MenuEnum.RS_Menu_SideBar_ExceptionalCase,
            title: formatMessageApi({ Label_COM_MonitorCenter: 'CasesStuckAtAutoActivity' }),
          },
          {
            code: MenuEnum.RS_Menu_SideBar_ClearSnapshot,
            title: formatMessageApi({ Label_COM_MonitorCenter: 'ClearSnapshot' }),
          },
          {
            code: MenuEnum.RS_Menu_SideBar_AuthorizedUser,
            title: formatMessageApi({ Label_COM_MonitorCenter: 'AuthorizedUser' }),
          },
        ],
        (item: any) => {
          return (
            <Authorized authority={[item?.code]} currentAuthority={list}>
              <div className={styles.toolItem}>
                <Item
                  key={item?.code}
                  title={item?.title}
                  onClick={() => handleSelect(item?.code)}
                />
              </div>
            </Authorized>
          );
        }
      )}
    </div>
  );
};
