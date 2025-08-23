import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { formatReleaseVersion } from '@/utils/version';

declare const VERSION: any;

const GlobalFooter = ({ className, copyright, icon }) => {
  const clsString = classNames(styles.globalFooter, className);

  return (
    <footer className={clsString}>
      {copyright && (
        <div className={styles.copyright}>
          {copyright?.substring(0, copyright?.indexOf('{'))}
          {icon}
          {copyright?.substring(copyright?.indexOf('}') + 1)}
        </div>
      )}
      {VERSION && <div className={styles.version}>Version No: {formatReleaseVersion(VERSION)}</div>}
    </footer>
  );
};

export default GlobalFooter;
