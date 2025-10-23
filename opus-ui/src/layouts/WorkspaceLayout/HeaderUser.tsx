import React, { useState } from 'react';
import { Menu, Icon, Dropdown, Avatar } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { history } from 'umi';
import classNames from 'classnames';
import { Hotkey } from '@/components/Hotkey/home';
import HotHighLight from '@/components/Hotkey/home/view/HotHighLight';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SS, SSKey } from '@/utils/cache';
import { ReactComponent as userSvg } from 'navigator/assets/user-login.svg';

import styles from './HeaderUser.less';

export default () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const guidance: boolean = useSelector(({ global }: any) => global?.guidance);
  const guidanceIndex: number = useSelector(({ global }: any) => global?.guidanceIndex);
  const { UserOptions } = HotkeyHomeIds;
  const [otherConfig, setOtherConfig] = useState({});
  const onMenuClick = ({ key }: any) => {
    if (key === 'workspaceUser' && guidance) {
      history.push(`/navigator/user/management/customization?g=t`);
      return;
    }
    if (key === 'userCenter') {
      history.push('/account/center');
      return;
    }
    if (key === 'workspaceUser') {
      const usermanagementTab = SS.getItem(SSKey.UserManagement_Tab, false);
      history.push(`/navigator/user/management/${usermanagementTab || 'basicInfo'}`);
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  const onVisibleChangeHandler = (e) => {
    if (e && guidance) {
      setOtherConfig({ visible: true });
      dispatch({
        type: 'global/changeGuidanceIndex',
        payload: guidanceIndex + 1,
      });
    }
  };

  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="workspaceUser" className="guidance-theme-three">
        <Icon type="user" />
        <span>{formatMessageApi({ Label_BIZ_Claim: 'menu.account.center' })}</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        <span>{formatMessageApi({ Label_BIZ_Claim: 'menu.account.logout' })}</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <HotHighLight
      condition={UserOptions}
      parent={{ className: styles.right }}
      parentClass={styles.parentActiveFocus}
      childrenClass={styles.activeFocus}
    >
      <Hotkey id={UserOptions}>
        <Dropdown
          onVisibleChange={onVisibleChangeHandler}
          overlayClassName="guidance-theme-twooo"
          overlay={menu}
          {...((guidance && otherConfig) || {})}
        >
          <span className={classNames(styles.action, styles.account, 'guidance-theme-two')}>
            <Avatar
              size="middle"
              className={styles.avatar}
              src={currentUser?.avatar}
              icon={<Icon component={userSvg} />}
            />
            {/* <span className={styles.name}>{currentUser?.userName}</span> */}
          </span>
        </Dropdown>
      </Hotkey>
    </HotHighLight>
  );
};
