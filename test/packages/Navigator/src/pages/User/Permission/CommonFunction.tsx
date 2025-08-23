import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import RightForm from '../_components/RightForm';
import CommonFunctionItem from './CommonFunctionItem';
import styles from './Permission.less';

export default () => {
  const { commonList } = useSelector(
    (state: any) => ({
      commonList: state.userManagement.commonList,
    }),
    shallowEqual
  );

  return (
    <div className={styles.wrap}>
      <RightForm formTitle="comment">
        <div className={styles.commentFunction}>
          {lodash.map(
            commonList,
            (item) => lodash.isPlainObject(item) && <CommonFunctionItem key={item.id} item={item} />
          )}
        </div>
      </RightForm>
    </div>
  );
};
