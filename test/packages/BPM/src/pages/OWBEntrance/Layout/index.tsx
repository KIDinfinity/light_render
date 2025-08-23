import Logo from '@/components/Logo/logo';
import classnames from 'classnames';
import useExpanderController from 'navigator/hooks/useExpanderController';
import React, { useRef, useEffect } from 'react';
import { Link } from 'umi';
import { AfterType } from '../constants';
import expansionStyles from './Layout.less';
import compressStyles from './LayoutCompress.less';

export default ({ children }: any) => {
  const { isSiderToggleOn } = useExpanderController();
  const compress = isSiderToggleOn;
  const targetElementRef = useRef(null);
  let Header;
  let Sider;
  let Content;
  React.Children.map(children, (child: any) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    if ((child.type as any).displayName === 'Header') {
      Header = child;
    } else if ((child.type as any).displayName === 'Sider') {
      Sider = child;
    } else if ((child.type as any).displayName === 'Content') {
      Content = child;
    }

    return null;
  });
  const styles = compress ? compressStyles : expansionStyles;
  const displayLink = (() => {
    const params = new URL(document.location).searchParams;
    const afterHook = params.get('afterHook');
    if (afterHook === AfterType.CloseWin) {
      return false;
    }
    return true;
  })();

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

  return (
    <div className={classnames(styles.detail)} data-role="bpmDetail">
      {Header}
      <div className={styles.main} ref={targetElementRef} data-role="bpmMain">
        <div className={styles.slider} data-role="bpmSider">
          {displayLink ? (
            <Link to={'/navigator'} key="logo" data-role="bpmLogo" className={styles.logo}>
              {compress ? <Logo sideOpen type="2" /> : <Logo type="2" />}
            </Link>
          ) : (
            <div className={styles.logo}>
              {compress ? <Logo sideOpen type="2" /> : <Logo type="2" />}
            </div>
          )}
          <div className={styles.button} data-role="bpmButton">
            {Sider}
          </div>
        </div>
        <div id="layoutContent" className={classnames(styles.owbContent, styles['black-scroll'])}>
          <div className={styles.absClass}>{Content}</div>
        </div>
      </div>
    </div>
  );
};
