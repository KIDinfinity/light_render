import React from 'react';
import { useSelector } from 'dva';
import classNames from 'classnames';
import { HotkeyProvider } from '@/components/Hotkey/home';
import styles from '../WorkspaceLayout.less';

export default ({ children }: any) => {
  const { pathname } = window.location;
  const isSwitchOn = useSelector(({ workspaceSwitchOn }: any) => workspaceSwitchOn.isSwitchOn);
  const isLoading = useSelector(
    ({ loading }: any) => loading.effects['authController/getCommonAuthorityList']
  );

  const contentClassName = classNames({
    [styles['padding-big']]: ![
      '/navigator',
      '/navigator/',
      '/swagger',
      '/hk',
      '/hk/',
      '/jp',
      '/jp/',
      '/th',
      '/th/',
      '/ph',
      '/ph/',
    ].includes(pathname),
    [styles['padding-small']]: pathname === '/navigator/advancedquery' && isSwitchOn,
    [styles['padding-none']]: ['/navigator/case/common/create'].includes(pathname),
  });

  return (
    <div className={contentClassName}>
      {!isLoading && <HotkeyProvider>{children}</HotkeyProvider>}
    </div>
  );
};
