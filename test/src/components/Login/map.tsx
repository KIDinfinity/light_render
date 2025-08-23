import React from 'react';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      type: 'username',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: '',
      index: 0,
    },
    rules: [
      {
        required: true,
        message: formatMessageApi({
          Label_COM_General: 'app.login.validation.username.required',
        }),
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '',
      index: 1,
    },
    rules: [
      {
        required: true,
        message: formatMessageApi({
          Label_COM_General: 'app.login.validation.password.required',
        }),
      },
    ],
  },
};
