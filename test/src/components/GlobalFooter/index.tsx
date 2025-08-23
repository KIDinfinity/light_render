import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { formatReleaseVersion } from '@/utils/version';

declare const VERSION: any;

const GlobalFooter = ({ className, links, copyright, icon }) => {
  const clsString = classNames(styles.globalFooter, className);

  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
              rel="noreferrer"
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && (
        <div>
          <span className={styles.copyright}>
            {copyright?.substring(0, copyright?.indexOf('{'))}
            {icon}
            {copyright?.substring(copyright?.indexOf('}') + 1)}{' '}
          </span>
          {VERSION && (
            <span className={styles.version}>Version No: {formatReleaseVersion(VERSION)}</span>
          )}
        </div>
      )}
    </footer>
  );
};

export default GlobalFooter;
