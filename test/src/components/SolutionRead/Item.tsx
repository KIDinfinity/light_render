import React from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import classnames from 'classnames';

import styles from './index.less';

interface IProps {
  type: string;
  show: boolean;
  count: number;
  module: string;
  id?: string;
  subjectType: string;
  handleClickItem: any;
  forbiClick?: boolean;
  children: any;
  callBack?: any;
  mustRead?: boolean;
}

export default ({ children, show, id, forbiClick, subjectType, callBack, mustRead }: IProps) => {
  const dispatch = useDispatch();

  return (
    <>
      {show && (
        <div
          className={styles.item}
          data-id={id}
          onClick={() => {
            lodash.isFunction(callBack) && callBack();
            if (!forbiClick && !mustRead) {
              dispatch({
                type: 'solutionRead/setReadItem',
                payload: { subjectIdList: [id], subjectType },
              });
            }
          }}
        >
          <div className={classnames(styles.wrap, mustRead && styles.mustRead)}>
            <div className={classnames(styles.border, mustRead && styles.mustRead)} />
          </div>
        </div>
      )}
      {children}
    </>
  );
};
