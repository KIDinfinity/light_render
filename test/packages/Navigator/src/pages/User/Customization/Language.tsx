import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Row, Icon } from 'antd';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as languageIcon } from './images/language.svg';
import styles from './Language.less';

export default () => {
  const dispatch = useDispatch();
  const { activeLanguage, languages } = useSelector(
    (state: any) => ({
      language: state.language,
      activeLanguage: state.language.activeLanguage,
      languages: state.language.languages,
    }),
    shallowEqual
  );

  useEffect(() => {
    return () => {
      dispatch({
        type: 'language/resetActiveLanguage',
      });
    };
  }, []);

  const handleSelectLanguage = (language: string) => {
    if (language && lodash.isString(language)) {
      dispatch({
        type: 'language/setActiveLanguage',
        payload: {
          language,
        },
      });
    }
  };

  return (
    <Row type="flex" className={styles.wrap}>
      <div className={styles.languageTitle}>
        <Icon component={languageIcon} />
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.language',
          })}
        </span>
      </div>
      <div className={styles.languageList}>
        {lodash
          .chain(languages)
          .filter((item) => lodash.isPlainObject(item))
          .map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                handleSelectLanguage(item.name);
              }}
              className={classnames(styles.item, {
                [styles.active]: item.name === activeLanguage,
              })}
            >
              {item.title}
            </button>
          ))
          .value()}
      </div>
    </Row>
  );
};
