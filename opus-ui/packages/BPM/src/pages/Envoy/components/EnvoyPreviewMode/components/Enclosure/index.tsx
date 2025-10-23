import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import styles from './Enclosure.less';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import classNames from 'classnames';
import { LoadingBox } from '../index';

export default function Enclosure() {
  const dispatch = useDispatch();
  const previewSelectLetter = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectLetter,
    shallowEqual
  );
  const previewEnclosure = useSelector(
    ({ envoyController }: any) => envoyController.previewEnclosure,
    shallowEqual
  );
  const previewSelectEnclosureIndex = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectEnclosureIndex,
    shallowEqual
  );
  const loading = useSelector((state) => state.loading.effects['envoyController/getEnclosureData']);

  const showFileHandle = useCallback((index) => {
    dispatch({
      type: 'envoyController/getAttachmentFile',
      payload: {
        index,
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'envoyController/getEnclosureData',
    });
  }, [previewSelectLetter]);

  return (
    <div className={styles.enclosureBox}>
      <p className={styles.title}>Attachment</p>
      <LoadingBox loading={loading} className={styles.loading}>
        <div className={styles.list}>
          {lodash.isEmpty(previewEnclosure?.[previewSelectLetter]) ? (
            <Empty />
          ) : (
            lodash.map(previewEnclosure?.[previewSelectLetter], (item, index) => (
              <div
                key={item?.fileFullName}
                className={classNames(styles.enclosureName, {
                  [styles.selected]: index === previewSelectEnclosureIndex,
                })}
                onClick={showFileHandle.bind(null, index)}
              >
                {item?.fileFullName}
              </div>
            ))
          )}
        </div>
      </LoadingBox>
    </div>
  );
}
