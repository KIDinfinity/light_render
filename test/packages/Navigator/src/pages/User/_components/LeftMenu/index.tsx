import React from 'react';
import { history, useDispatch } from 'umi';
import BackButton from './BackButton';
import Info from './Info';
import Tabs from './Tabs';
import styles from './index.less';
import classnames from 'classnames';
const LeftMenu = ({ model }: any) => {
  const dispatch = useDispatch();
  return (
    <div className={classnames(styles.slider, 'guidance-theme-six')}>
      <div className={classnames(styles.content, 'guidance-ex-mask-theme-five')}>
        <span
          onClick={() => {
            history.push('/');
            dispatch({
              type: 'global/changeGuidance',
              payload: false,
            });
          }}
          className={classnames(styles.header, 'guidance-theme-seven')}
        />
        <Info />
        <Tabs model={model} />
        <BackButton />
      </div>
    </div>
  );
};
export default React.memo(LeftMenu);
