import React from 'react';
import { Icon } from 'antd';
import { ReactComponent as Filed } from 'opus/Assets/icon-Filed.svg';
import classNames from 'classnames';
import styles from './index.less';

const uploadSetion = (props) => {
  const { uploadFile } = props;

  return (
    <div className={classNames(styles.fileUpload)}>
      <div className={classNames(styles.filedName)}>
        <Icon component={Filed} />
        <span>{uploadFile?.name || ''}</span>
      </div>
    </div>
  );
};

export default uploadSetion;
