import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'dva';
import styles from './index.less';

export default ({ filterChartList }: any) => {
  const dispatch = useDispatch();

  const reverseAllVisible = async () => {
    await dispatch({
      type: 'dashboardController/reverseAllVisible',
      payload: {
        filterChartList,
      },
    });
  };

  return (
    <div
      className={classnames({
        [styles.reverseVisibleBtn]: true,
      })}
      onClick={reverseAllVisible}
    >
      All of current criteria
    </div>
  );
};
