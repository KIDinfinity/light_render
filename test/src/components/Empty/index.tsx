import React from 'react';
import { Empty } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import classNames from 'classnames';

const Title = ({ description }: any) => (
  <span className={styles.lineWrap}>
    <span className={styles.description}>{description}</span>
  </span>
);

const CommonEmpty = ({ description, className, ...res }: any) => {
  const defaultDes = formatMessageApi({
    Label_COM_General: 'noData',
  });

  const des = description || defaultDes;

  return (
    <div className={classNames(styles.emptyWrap, className)} {...res}>
      <Empty description={<Title description={des} />} />
    </div>
  );
};

export default CommonEmpty;
