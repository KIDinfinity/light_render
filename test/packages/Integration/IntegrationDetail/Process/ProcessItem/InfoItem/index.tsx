import React from 'react';
import styles from './index.less';
import { Icon } from 'antd';
import { ReactComponent as copyIcon } from 'integration/assets/copy.svg';
import { copy } from 'integration/Utils';

interface IProps {
  title: string;
  info: string;
  time?: string;
  enableContent?: boolean;
  showCopy?: boolean;
  contentStyle?: object;
}

export default ({ title, info, time, showCopy = false, contentStyle }: IProps) => {
  return (
    <div>
      <div className={styles.headBlock}>
        <span>
          {title}
          {time && `\xa0 \xa0(${time})`}
        </span>
        &nbsp; &nbsp;
        {showCopy ? (
          <span
            className={styles.copyBg}
            onClick={() => {
              copy(info);
            }}
          >
            <Icon component={copyIcon} />
          </span>
        ) : null}
      </div>
      <div className={styles.info} style={contentStyle}>
        {info}
      </div>
    </div>
  );
};
