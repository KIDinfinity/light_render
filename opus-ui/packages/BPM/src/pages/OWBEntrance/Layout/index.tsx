import Logo from '@/components/Logo/logo';
import isOpus from '@/utils/isOpus';
import classnames from 'classnames';
import useExpanderController from 'navigator/hooks/useExpanderController';
import React from 'react';
import { Link } from 'umi';
import { AfterType } from '../constants';
import expansionStyles from './Layout.less';
import compressStyles from './LayoutCompress.less';

import SiderTabs from 'opus/Modules/SiderTabs';

export default ({ children }: any) => {
  const { isSiderToggleOn } = useExpanderController();
  const showOpusLayout = isOpus();
  const compress = isSiderToggleOn && !showOpusLayout;

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
  return (
    <div
      className={classnames(styles.detail, { [styles.opus]: showOpusLayout })}
      data-role="bpmDetail"
    >
      {Header}
      <div className={styles.main} data-role="bpmMain">
        <div className={styles.slider} data-role="bpmSider">
          {displayLink ? (
            <Link to={'/navigator'} key="logo" data-role="bpmLogo" className={styles.logo}>
              {compress ? <Logo sideOpen type="2" /> : <Logo type="2" />}
            </Link>
          ) : (
            <> {compress ? <Logo sideOpen type="2" /> : <Logo type="2" />}</>
          )}
          <div className={styles.button} data-role="bpmButton">
            {Sider}
          </div>
        </div>
        {showOpusLayout ? (
          <div className={styles.container}>
            <SiderTabs />
            <div id="layoutContent" className={classnames(styles.content, styles['black-scroll'])}>
              {Content}
            </div>
          </div>
        ) : (
          <div id="layoutContent" className={classnames(styles.owbContent, styles['black-scroll'])}>
            {Content}
          </div>
        )}
      </div>
    </div>
  );
};
