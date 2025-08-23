import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import CryptoJS from 'crypto-js';
import lodash from 'lodash';
import { history } from 'umi';
import { Spin } from 'antd';
import styles from './index.less';

const SilentLogin = () => {
  const dispatch = useDispatch();
  const queryString = window.location.search;

  useEffect(() => {
    const params = new URLSearchParams(queryString);
    console.log({ queryString });
    if (!params.has('userId')) {
      history.push('/supportCenter/user/login');
    }
    if (params.has('password')) {
      const password = params.get('password');
      const userId = params.get('userId');
      if (lodash.isNil(password) || lodash.isNil(userId)) {
        history.push('/supportCenter/user/login');
      }
      const passKey = CryptoJS.AES.decrypt(password, userId).toString(CryptoJS.enc.Utf8);
      dispatch({
        type: 'supportCenterController/getNativeLogin',
        payload: {
          userId,
          passKey,
        },
      });
    } else if (params.has('key')) {
      const key = params.get('key');
      const username = params.get('userId');
      const decryptedKey = CryptoJS.AES.decrypt(key, username).toString(CryptoJS.enc.Utf8);
      dispatch({
        type: 'supportCenterController/commonLoginProcess',
        payload: {
          params: {
            username,
            password: decryptedKey,
          },
        },
      });
    }
  }, [dispatch, queryString]);

  return (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  );
};

export default SilentLogin;
