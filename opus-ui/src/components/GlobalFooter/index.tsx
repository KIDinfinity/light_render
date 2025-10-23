import React from 'react';
import { useSelector } from 'dva';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright, icon }) => {
  const clsString = classNames(styles.globalFooter, className);
  const version = useSelector((state) => state.global.version);
  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href} rel="noreferrer"
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
          {version && <span className={styles.version}>Version No: {version}</span>}
        </div>
      )}
    </footer>
  );
};

export default GlobalFooter;
