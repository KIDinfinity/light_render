import type { FunctionComponent, CSSProperties } from 'react';
import React from 'react';
import { Alert } from 'antd';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './styles.less';

interface IProps {
  className?: string;
  editActived?: boolean;
  style?: CSSProperties;
}

const DragAlert: FunctionComponent<IProps> = ({ className, editActived, ...res }) => (
  <div className={classNames(styles.draggerHintWrap, className)} {...res}>
    {editActived ? (
      <Alert
        className={classNames(styles.errorHintMessage, styles.hintMessage)}
        message={formatMessageApi({
          Label_BIZ_Claim: 'document.label.file-drop-not-hint-message',
        })}
        type="error"
      />
    ) : (
      <Alert
        className={classNames(styles.successHintMessage, styles.hintMessage)}
        message={formatMessageApi({ Label_BIZ_Claim: 'document.label.drop-file-hint-message' })}
        type="success"
      />
    )}
  </div>
);

export default DragAlert;
