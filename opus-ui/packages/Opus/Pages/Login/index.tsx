import { LS, LSKey, SS, SSKey } from '@/utils/cache';
import { setLoginPathname } from '@/utils/loginUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch, useSelector } from 'dva';
import { history, useLocation } from 'umi';
import lodash from 'lodash';
import { Close } from 'opus/Components/Modals';
import Title from '@/layouts/components/Title';

import { ReactComponent as CloseCircleFilled } from 'packages/Opus/Assets/icon-closeCircleFilled.svg';
import { ReactComponent as GlobalOutlined } from 'packages/Opus/Assets/icon-globalOutlined.svg';
import { ReactComponent as LockOutlined } from 'packages/Opus/Assets/icon-lockOutlined.svg';
import { ReactComponent as UserOutlined } from 'packages/Opus/Assets/icon-userOutlined.svg';
import { Alert, Button, Checkbox, Col, Form, Icon, Input, Row } from 'opus/Components/Antd';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import fwdLogo from '/src/assets/public/fwd-logo-dark.png';

const SIGN_IN = formatMessageApi({ Label_COM_Opus: 'Signin' });

const Login = ({ form }: any) => {
  const loginError = useSelector((state: any) => state.login.loginError);
  const dispatch = useDispatch();
  const { pathname, query = {} } = useLocation();

  const { isFieldTouched, getFieldError, validateFields } = form;

  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');

  const [showHelpMsg, setShowHelpMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ show: false, message: '' });

  const regionCode: any = SS.getItem(SSKey.CONFIGS)?.regionCode;
  const ssoConfigs = [
    {
      region: 'JP',
      title: formatMessageApi({ Label_COM_Opus: 'LoginSSO' }),
    },
    {
      region: 'TH',
      title: formatMessageApi({ Label_COM_Opus: 'LoginTHSSO' }),
    },
  ];
  const ssoConfigsHK = [
    {
      region: 'HK',
      title: formatMessageApi({ Label_COM_Opus: 'LoginSSO' }),
    },
  ];
  const configs = regionCode === 'hk' ? ssoConfigsHK : ssoConfigs;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginPathname();
      validateFields(['username', 'password'], { force: true }, (err, values) => {
        lodash.set(values, 'userId', values?.username);

        if (!err) {
          const isNewLogin = /\/opus\/user\/systemAdmin\/login$/.test(pathname);
          const isProdLogin = /\/opus\/user\/prodAdmin\/login$/.test(pathname);

          // 记住用户ID
          const rememberMe = form.getFieldValue('remember');
          if (rememberMe) {
            LS.setItem(LSKey.OPUS_REMEMBER_USER, { id: values?.username, pwd: values?.password });
          } else {
            LS.removeItem(LSKey.OPUS_REMEMBER_USER);
          }

          dispatch({
            type: 'login/getDefaultLogin',
            payload: {
              params: values,
              isNewLogin,
              isProdLogin,
            },
          });
        }
      });
    },
    [dispatch, form, pathname, validateFields]
  );

  const handleSSO = ({ region }: any) => {
    setLoginPathname();
    SS.setItem(SSKey.CONFIGS, {
      ...SS.getItem(SSKey.CONFIGS),
      region,
    });
    SS.setItem(SSKey.SSOTYPE, region);
    history.push('/opus/home');
  };

  useEffect(() => {
    // 清除登录记录
    LS.setItem(LSKey.CURRENTUSER, '');
    LS.setItem(LSKey.AUTHORITY, ['guest']);
  }, []);

  useEffect(() => {
    const result = SS.getItem(SSKey.SSOLOGIN_RESULT) || {};
    if (!lodash.isEmpty(result) && !result?.success) {
      setErrorMsg({
        show: true,
        message: result?.message,
      });
    }
  }, []);

  useEffect(() => {
    // 恢复上次记住的登录账号
    const rememberedUser = LS.getItem(LSKey.OPUS_REMEMBER_USER);

    if (rememberedUser) {
      form?.setFieldsValue({
        username: rememberedUser.id,
        password: rememberedUser.pwd,
        remember: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <Title inLogin={true} />

      <Row>
        <Col className={styles.left} span={10}>
          <div className={styles.login}>
            <div className={styles.header}>
              <img className={styles.logo} src={fwdLogo} alt="FWD" />
              <span className={styles.opus}>
                {formatMessageApi({ Label_BIZ_Policy: 'TabOpus' })}
              </span>
            </div>
            <div className={styles.title}>{SIGN_IN}</div>
            {!lodash.isEmpty(loginError) && (
              <div className={styles.errorMsg}>
                <Icon component={CloseCircleFilled} />
                {loginError?.content}
              </div>
            )}
            <Form layout="vertical" className={styles.form} onSubmit={handleSubmit}>
              <Form.Item
                label={formatMessageApi({ Label_COM_Opus: 'UserID' })}
                help={usernameError || ''}
              >
                {form.getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<UserOutlined />}
                    placeholder={formatMessageApi({ Label_COM_Opus: 'UserID' })}
                  />
                )}
              </Form.Item>
              <Form.Item
                label={formatMessageApi({ Label_COM_Opus: 'Password' })}
                help={passwordError || ''}
              >
                {form.getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder={formatMessageApi({ Label_COM_Opus: 'Password' })}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Form.Item>
                  {form.getFieldDecorator('remember', { valuePropName: 'checked' })(
                    <Checkbox className={styles.remember}>
                      {formatMessageApi({ Label_COM_Opus: 'RememberMe' })}
                    </Checkbox>
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button className={styles.submit} type="default" htmlType="submit">
                  {formatMessageApi({ Label_COM_General: 'Login' })}
                </Button>
              </Form.Item>

              {lodash.map(configs, ({ region, title }: any) => {
                return (
                  <Form.Item>
                    <Button
                      className={styles.ssoDefault}
                      type={SS.getItem(SSKey.SSOTYPE, false) === region ? 'primary' : 'default'}
                      onClick={() => {
                        handleSSO({ region });
                      }}
                    >
                      {title}
                    </Button>
                  </Form.Item>
                );
              })}
            </Form>
            <div className={styles.extra}>
              <Button type="text" className={styles.help} onClick={() => setShowHelpMsg(true)}>
                {formatMessageApi({ Label_COM_Opus: 'NeedHelp' })}
              </Button>
              <Button type="text" className={styles.language}>
                <Icon component={GlobalOutlined} style={{ fontSize: '14px' }} />
                EN
              </Button>
            </div>
            {showHelpMsg && (
              <Alert
                message={
                  <div className={styles.help}>
                    <div className={styles.helpMsg}>
                      {formatMessageApi({ Label_COM_Message: 'MSG_001023' })}
                    </div>
                    {/* <Button type="text" className={styles.contact}>
                      {formatMessageApi({
                        Label_COM_General: 'Contact',
                      })}
                      <Icon component={ChevronRight} style={{ fontSize: '14px' }} />
                    </Button> */}
                  </div>
                }
                type="info"
                showIcon
                className={styles.alert}
              />
            )}
          </div>
        </Col>
        <Col span={14}>
          <div className={styles.bg} />
        </Col>
      </Row>
      <Close
        show={errorMsg?.show}
        hiddenIcon
        title="Error"
        handleClose={() => {
          SS.removeItem(SSKey.SSOLOGIN_RESULT);
          setErrorMsg({ show: false, message: '' });
        }}
      >
        {errorMsg.message}
      </Close>
    </div>
  );
};

export default Form.create({
  name: 'opus_login_form',
  onFieldsChange(props: any, changedFields: any) {
    const { remember } = changedFields;
    if (remember && remember.touched && !remember.value) {
      LS.removeItem(LSKey.OPUS_REMEMBER_USER);
    }
  },
})(Login);
