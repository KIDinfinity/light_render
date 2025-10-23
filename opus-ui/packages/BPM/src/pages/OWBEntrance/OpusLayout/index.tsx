import classnames from 'classnames';
import React from 'react';
import expansionStyles from './Layout.less';
import SiderTabs from 'opus/Modules/SiderTabs';

export default ({ children }: any) => {
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
  const styles = expansionStyles;
  return (
    <div className={classnames(styles.detail, styles.opus)} data-role="bpmDetail">
      <div className={styles.header}>{Header}</div>
      <div className={styles.main} data-role="bpmMain">
        <div className={styles.slider} data-role="bpmSider">
          <div className={styles.button} data-role="bpmButton">
            {Sider}
          </div>
        </div>
        <div className={styles.container}>
          <div id="layoutContent" className={classnames(styles.content, styles['black-scroll'])}>
            {Content}
          </div>
        </div>
      </div>
      <div className={styles.sider}>
        <SiderTabs />
      </div>
    </div>
  );
};
