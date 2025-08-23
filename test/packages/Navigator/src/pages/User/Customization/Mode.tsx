import React, { useEffect } from 'react';
import classnames from 'classnames';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Row, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as modeIcon } from './images/defaultMode.svg';
import styles from './Mode.less';

export default () => {
  const dispatch = useDispatch();
  const { activeMode, modeList, mode } = useSelector(
    (state: any) => ({
      mode: state.mode,
      activeMode: state.mode.activeMode,
      modeList: state.mode.modeList,
    }),
    shallowEqual
  );
  useEffect(() => {
    return () => {
      if (mode && lodash.isString(mode)) {
        dispatch({
          type: 'mode/setActiveMode',
          payload: {
            activeMode: mode,
          },
        });
      }
    };
  }, []);

  const handleSelect = (mode) => {
    if (mode && lodash.isString(mode)) {
      dispatch({
        type: 'mode/setActiveMode',
        payload: {
          activeMode: mode,
        },
      });
    }
  };
  const titles = {
    flow: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.index.mode.flow',
    }),
    table: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.index.mode.table',
    }),
    card: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.index.mode.card',
    }),
  };
  return (
    <Row type="flex" className={styles.wrap}>
      <div className={styles.modeTitle}>
        <Icon component={modeIcon} />
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.default-mode',
          })}
        </span>
      </div>
      <div className={styles.modeList}>
        {lodash.map(lodash.compact(modeList), (item) => (
          <div
            key={item.name}
            className={classnames(styles.item, styles[item.name], {
              [styles.active]: activeMode === item.name,
            })}
            onClick={() => {
              handleSelect(item.name);
            }}
          >
            <h3 className={styles.title}>{titles[item.name]}</h3>
            <span className={styles.sign} />
          </div>
        ))}
      </div>
    </Row>
  );
};
