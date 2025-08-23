import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import styles from './Enclosure.less';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import classNames from 'classnames';
import { LoadingBox } from '../index';
import { ReactComponent as EditIcon } from 'bpm/assets/edit2.svg';
import { Icon } from 'antd';

export default function Enclosure() {
  const dispatch = useDispatch();
  const previewSelectLetter = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectLetter,
    shallowEqual
  );
  const previewSelectEnclosureEdit = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectEnclosureEdit,
    shallowEqual
  );
  const previewModeDataLetterAfterAttachList = useSelector(
    ({ envoyController }: any) =>
      envoyController.previewModeData?.letters?.[previewSelectLetter]?.after?.params
        ?.previewAttachFiles,
    shallowEqual
  );

  const previewSelectEnclosureIndex = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectEnclosureIndex,
    shallowEqual
  );
  const showFileHandle = useCallback(
    (index, params) => {
      const isEdit = params?.edit || false;
      if (index !== previewSelectEnclosureIndex) {
        dispatch({
          type: 'envoyController/saveSelectEnclosureIndex',
          payload: {
            index,
          },
        });
      }
      if (index === previewSelectEnclosureIndex && previewSelectEnclosureEdit) {
        return;
      }
      dispatch({
        type: 'envoyController/saveSelectEnclosureEdit',
        payload: {
          previewSelectEnclosureEdit: isEdit,
        },
      });
    },
    [previewSelectEnclosureIndex, previewSelectEnclosureEdit]
  );

  return (
    <div className={styles.enclosureBox}>
      <p className={styles.title}>Attachment</p>
      <LoadingBox className={styles.loading}>
        <div className={styles.list}>
          {lodash.isEmpty(previewModeDataLetterAfterAttachList) ? (
            <Empty />
          ) : (
            lodash.map(previewModeDataLetterAfterAttachList, (item, index) => {
              return (
                <div
                  key={item?.fileFullName}
                  className={classNames(styles.enclosureName, {
                    [styles.selected]: index === previewSelectEnclosureIndex,
                  })}
                  onClick={showFileHandle.bind(null, index, { edit: false, attachment: item })}
                >
                  <span title={item?.fileFullName}>{item?.fileFullName}</span>
                  {item.editable && item.previewHtml && (
                    <Icon
                      className={styles.icon}
                      component={EditIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        showFileHandle.bind(null, index, { edit: true, attachment: item })();
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </LoadingBox>
    </div>
  );
}
