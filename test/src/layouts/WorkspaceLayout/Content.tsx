import React, { useRef, useEffect } from 'react';
import { useSelector } from 'dva';
import classNames from 'classnames';
import { HotkeyProvider } from '@/components/Hotkey/home';
import ScrollWrapper from '@/components/ScrollWrapper';
import useExpanderController from 'navigator/hooks/useExpanderController';
import styles from '../WorkspaceLayout.less';

export default ({ children }: any) => {
  const { pathname } = window.location;
  const isSwitchOn = useSelector(({ workspaceSwitchOn }: any) => workspaceSwitchOn.isSwitchOn);
  const isLoading = useSelector(
    ({ loading }: any) => loading.effects['authController/getCommonAuthorityList']
  );
  const { isSiderToggleOn } = useExpanderController();
  const targetElementRef = useRef(null);

  const contentClassName = classNames({
    [styles.contentWrapper]: true,
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
      '/supportCenter/monitor',
    ].includes(pathname),
    [styles['padding-small']]: pathname === '/navigator/advancedquery' && isSwitchOn,
    [styles['padding-none']]: ['/navigator/case/common/create'].includes(pathname),
    [styles['non-horizontal-padding']]: isSiderToggleOn,
  });

  useEffect(() => {
    const handleScroll = () => {
      targetElement.scrollTop = 0;
    };

    const targetElement = targetElementRef.current;
    targetElement.addEventListener('scroll', handleScroll);

    // 清理函数，组件卸载时移除事件监听器
    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (pathname.replace('/', '') === 'navigator') {
    return (
      <div ref={targetElementRef} className={contentClassName}>
        {!isLoading && <HotkeyProvider>{children}</HotkeyProvider>}
      </div>
    );
  }

  return (
    <ScrollWrapper>
      <div ref={targetElementRef} className={contentClassName}>
        {!isLoading && <HotkeyProvider>{children}</HotkeyProvider>}
      </div>
    </ScrollWrapper>
  );
};
