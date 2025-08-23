import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'dva';
import { Alert, notification } from 'antd';
import type { WrappedFormUtils } from 'antd/lib/form/Form';
import lodash from 'lodash';
import { useLocation } from 'umi';
import Login from '@/components/Login';
import ResetPassword from './ResetPassword';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Hotkey } from '@/components/Hotkey/login/view';
import { HotkeyLoginIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { SS, SSKey } from '@/utils/cache';
import { setLoginPathname } from '@/utils/loginUtils';
import { tenant } from '@/components/Tenant';
import UserEnum from './UserEnum';
import styles from './Login.less';

const { Tab, UserName, Password, Submit }: any = Login;
const notificationKey = UserEnum.USER_NOTIFICATION_KEY;

const LoginAccount = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const loginError = useSelector((state: any) => state.login.loginError);
  const submitting = useSelector((state: any) => state.loading.effects['login/login']);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetParams, setResetParams] = useState({});

  const loginForm: any = useRef<WrappedFormUtils<{ defaultActiveKey: string }>>();

  const handleNotification = (hiddenNotification?: boolean) => {
    const result = SS.getItem(SSKey.SSOLOGIN_RESULT) || [];
    if (!lodash.isEmpty(result) && !result?.success) {
      notification.error({
        message: result?.message || 'SSO login failed!',
        key: notificationKey,
        duration: 0,
      });
      if (hiddenNotification) {
        notification.close(notificationKey);
        SS.removeItem(SSKey.SSOLOGIN_RESULT);
      }
    }
  };

  const handleSubmit = (err: any, values: any) => {
    setLoginPathname();
    lodash.set(values, 'userId', values?.username);
    handleNotification(true);
    if (!err) {
      const isNewLogin = lodash.includes(pathname.toLowerCase(), 'systemadmin');
      const isProdLogin = lodash.includes(pathname.toLowerCase(), 'prodadmin');

      dispatch({
        type: 'login/getDefaultLogin',
        payload: {
          params: values,
          isNewLogin,
          isProdLogin,
        },
      });
    }
  };

  const renderMessage = (content: any) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  useEffect(() => {
    handleNotification();
  }, []);

  const handleForgetPassword = () => {
    loginForm.current.props?.form.validateFields(async (err: any, values: any) => {
      if (!values.username) return;
      const userId = values?.username || '';
      const response: any = await dispatch({
        type: 'login/getUserPersonalInfo',
        payload: {
          userId,
        },
      });
      if (!lodash.isEmpty(response)) {
        setResetParams({ ...response, userId });
        setShowResetPassword(true);
      }
    });
  };

  return (
    <div className={styles.main}>
      <Login defaultActiveKey="account" onSubmit={handleSubmit} wrappedComponentRef={loginForm}>
        <Tab key="account" tab="">
          {loginError &&
            !lodash.isEmpty(loginError) &&
            !lodash.isEmpty(loginError?.content) &&
            renderMessage(loginError?.content)}
          <Hotkey id={HotkeyLoginIds.loginUserName}>
            <UserName name="username" />
          </Hotkey>
          <Hotkey id={HotkeyLoginIds.loginPassword}>
            <Password name="password" />
          </Hotkey>
        </Tab>
        {!!tenant.loginMode()?.enableForgetPassword && (
          <div
            onClick={(e) => {
              e.preventDefault();
              handleForgetPassword();
            }}
            className={styles.link}
          >
            <span>{formatMessageApi({ Label_BIZ_Claim: 'ForgetPassword' })}</span>
          </div>
        )}

        <Submit loading={submitting}>
          <span>{formatMessageApi({ Label_BIZ_Claim: 'app.login.login' })}</span>
        </Submit>
      </Login>
      <ResetPassword
        resetParams={resetParams}
        setResetParams={setResetParams}
        showResetPassword={showResetPassword}
        setShowResetPassword={setShowResetPassword}
      />
    </div>
  );
};

export default LoginAccount;
