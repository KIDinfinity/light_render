import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import styles from './item.less';
import { NAMESPACE } from '../../BaseProduct/activity.config';
import { useSelector, useDispatch } from 'dva';
import { get } from 'lodash';

export default ({ versionInfo, index }: any) => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: any) => get(state, `${NAMESPACE}.currentEwsDataIndex`));

  const handleSelect = () => {
    if (currentIndex !== index) {
      dispatch({
        type: `${NAMESPACE}/setCurrentEwsDataIndex`,
        payload: {
          index,
        },
      });
    }
  };

  return (
    <div
      className={classnames(styles.versionItem, {
        [styles.selected]: index === currentIndex,
      })}
      onClick={handleSelect}
    >
      {moment(versionInfo.submitDate).format('L LT')}
    </div>
  );
};
