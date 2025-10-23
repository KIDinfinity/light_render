import React from 'react';
import { useSelector, useDispatch } from 'dva';
import moment from 'moment';
import { Checkbox } from 'antd';
import classNames from 'classnames';
import { NAMESPACE } from '../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const DocumentItem = ({ documentItem }: any) => {
  const dispatch = useDispatch();

  const showDocumentId =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.showDocumentId) || [];

  const { id, isSelect, docTypeCode, name, receivedDate } = documentItem || {};

  return (
    <div className={classNames(styles.documentItem, showDocumentId === id && styles.select)}>
      <div
        onClick={(e: any) => {
          e.preventDefault();
          dispatch({
            type: `${NAMESPACE}/saveShowDocumentId`,
            payload: {
              showDocumentId: id,
            },
          });
        }}
      >
        <div className={styles.title}>
          {formatMessageApi({ Dropdown_CFG_DocumentType: docTypeCode })}
        </div>
        <div className={classNames(styles.content)}>
          <div className={styles.documentField}>{name}</div>
          <div className={styles.documentField}>
            {moment(receivedDate).isValid() && moment(receivedDate).format('L HH:mm:ss')}
          </div>
        </div>
      </div>
      <div className={classNames(styles.checkbox)}>
        <Checkbox
          checked={isSelect === 'Y'}
          onChange={() => {
            dispatch({
              type: `${NAMESPACE}/updateDocumentItem`,
              payload: {
                id,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default DocumentItem;
