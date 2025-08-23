import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Row, Icon } from 'antd';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { LS, LSKey } from '@/utils/cache';
import { ReactComponent as themeIcon } from './images/theme.svg';
import styles from './Theme.less';

export default () => {
  const dispatch = useDispatch();
  const { themeList, activeTheme } = useSelector(
    (state: any) => ({
      themeList: state.theme.themeList,
      activeTheme: state.theme.activeTheme,
    }),
    shallowEqual
  );

  useEffect(() => {
    return () => {
      dispatch({
        type: 'theme/resetActiveTheme',
      });
    };
  }, []);
  const handleSelectTheme = (theme: any) => {
    if (theme && lodash.isString(theme)) {
      LS.setItem(LSKey.THEME, theme);
      dispatch({
        type: 'theme/setActiveTheme',
        payload: {
          theme,
        },
      });
    }
  };

  return (
    <Row type="flex" className={styles.wrap}>
      <div className={classnames(styles.themeTitle, 'guidance-theme-four')}>
        <Icon component={themeIcon} />
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.theme-color',
          })}
        </span>
      </div>
      <div className={classnames(styles.themeList,'guidance-theme-four-high')}>
        {lodash
          .chain(themeList)
          .filter((item) => lodash.isPlainObject(item))
          .map((item) => (
            <div
              key={item.name}
              className={classnames(styles.item, styles[item.name], {
                [styles.active]: activeTheme === item.name,
              })}
              onClick={() => {
                handleSelectTheme(item.name);
              }}
            >
              <h3 className={styles.title}>
                {formatMessageApi({
                  Label_BIZ_Claim: `app.usermanagement.basicInfo.label.theme-${item.name}`,
                })}
              </h3>
              <div className={styles.sign} />
            </div>
          ))
          .value()}
      </div>
    </Row>
  );
};
