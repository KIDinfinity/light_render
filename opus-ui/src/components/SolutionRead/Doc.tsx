import React from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';

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
}

export default ({ children, show, id, forbiClick, subjectType, callBack }: IProps) => {
  const dispatch = useDispatch();

  return (
    <>
      {show ? (
        <div
          className={styles.doc}
          data-id={id}
          onClick={() => {
            lodash.isFunction(callBack) && callBack();
            if (!forbiClick) {
              dispatch({
                type: 'solutionRead/setReadItem',
                payload: { subjectIdList: [id], subjectType },
              });
            }
          }}
        >
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
