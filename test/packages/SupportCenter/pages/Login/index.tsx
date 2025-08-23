import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { LS, LSKey } from '@/utils/cache';
import { setLoginPathname } from '@/utils/loginUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch, useSelector } from 'dva';
import { useLocation, useSearchParams, history } from 'umi';
import { Button, Checkbox, Col, Form, Icon, Input, Row, Select, Spin } from 'antd';
import Title from '@/layouts/components/Title';
import { ReactComponent as CloseCircleFilled } from '@/assets/closeCircleFilled.svg';
import WelcomeImg from 'packages/SupportCenter/assets/welcome_banner.png';
import CryptoJS from 'crypto-js';

import lodash from 'lodash';
// import { Close } from 'opus/Components/Modals';
import { passKey } from 'packages/SupportCenter/_models/funtions';

const Login = ({ form }: any) => {
  const loginError = useSelector((state: any) => state.login.loginError);
  const regionList = useSelector((state: any) => state.supportCenterController.switchRegionList);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { isFieldTouched, getFieldError, validateFields, setFieldsValue } = form;

  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  const regionError = isFieldTouched('region') && getFieldError('region');
  const [currentRegion, setRegion] = useState<string | undefined>('--');
  const [errorMsg, setErrorMsg] = useState({ show: false, message: '' });
  const [searchParams] = useSearchParams();
  const isSilent = searchParams.get('silent') || false;
  const regionConfigs = useMemo(() => {
    if (!regionList || lodash.isEmpty(regionList)) return [];
    return regionList?.map((i: { region: string }) => ({
      region: i?.region,
      title: formatMessageApi({ DropDown_COM_Region: i?.region?.toUpperCase() }),
    }));
  }, [regionList]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginPathname();
      validateFields(['username', 'password', 'region'], { force: true }, (err, values) => {
        lodash.set(values, 'userId', values?.username);

        if (!err) {
          const isNewLogin = /\/supportCenter\/user\/systemAdmin\/login$/.test(pathname);
          const isProdLogin = /\/supportCenter\/user\/prodAdmin\/login$/.test(pathname);
          const regionItem = regionList.find(
            (i: { region: string }) => i.region === values?.region
          );
          const currentHost = window.location.host;
          // 记住用户ID
          const rememberMe = form.getFieldValue('remember');
          if (rememberMe) {
            LS.setItem(LSKey.SUPPORT_CENTER_REMEMBER_USER, {
              id: values?.username,
              pwd: values?.password,
              na: values?.region,
            });
          } else {
            LS.removeItem(LSKey.SUPPORT_CENTER_REMEMBER_USER);
          }

          if (regionItem.host === currentHost) {
            dispatch({
              type: 'supportCenterController/commonLoginProcess',
              payload: {
                params: values,
                isNewLogin,
                isProdLogin,
                region: currentRegion,
              },
            });
          } else {
            dispatch({
              type: 'supportCenterController/setRegionHost',
              payload: {
                region: currentRegion,
                ...values,
              },
            });
          }
        }
      });
    },
    [currentRegion, dispatch, form, pathname, regionList, validateFields]
  );

  const handleRegionChange = (e: any) => {
    setRegion(e);
  };

  const handleUserId = useCallback(
    (e: any) => {
      e.preventDefault();
      setRegion('--');
      setFieldsValue({ region: '--' });
      dispatch({
        type: 'supportCenterController/getRegionList',
        payload: { userId: e?.target?.value },
      });
    },
    [dispatch, setFieldsValue]
  );

  useEffect(() => {
    // 清除登录记录
    LS.setItem(LSKey.CURRENTUSER, '');
    LS.setItem(LSKey.AUTHORITY, ['guest']);
  }, []);

  useEffect(() => {
    // 恢复上次记住的登录账号
    const rememberedUser = LS.getItem(LSKey.SUPPORT_CENTER_REMEMBER_USER);

    if (rememberedUser) {
      dispatch({
        type: 'supportCenterController/getRegionList',
        payload: { userId: rememberedUser.id },
      });
      form?.setFieldsValue({
        username: rememberedUser.id,
        password: rememberedUser.pwd,
        region: rememberedUser.na,
        remember: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSilent) {
      if (searchParams.has('passkey')) {
        let params = searchParams.get('passkey')?.toString();
        if (lodash.isNil(params)) {
          history.push('/supportCenter/user/login');
        }
        params = CryptoJS.AES.decrypt(decodeURIComponent(params as string), passKey).toString(
          CryptoJS.enc.Utf8
        );
        const { encryptedKey, userId } = JSON.parse(params as string);

        if (lodash.isNil(encryptedKey) || lodash.isNil(userId)) {
          history.push('/supportCenter/user/login');
        }

        dispatch({
          type: 'supportCenterController/getNativeLogin',
          payload: {
            userId,
            passKey: encryptedKey,
          },
        });
      } else if (searchParams.has('key')) {
        let key = searchParams.get('key')?.toString();
        key = decodeURIComponent(key as string);

        const decryptedKey = CryptoJS.AES.decrypt(key, passKey).toString(CryptoJS.enc.Utf8);

        const params = JSON.parse(decryptedKey);

        dispatch({
          type: 'supportCenterController/commonLoginProcess',
          payload: {
            params,
          },
        });
      }
    } else {
      if (searchParams.has('region')) {
        const region = String(searchParams.get('region'));
        setFieldsValue({ region });
      }
      if (searchParams.has('userId')) {
        const userId = String(searchParams.get('userId'));
        dispatch({
          type: 'supportCenterController/getRegionList',
          payload: { userId },
        });
        setFieldsValue({ username: userId });
      }
    }
  }, [dispatch, isSilent, pathname, searchParams, setFieldsValue]);

  useEffect(() => {
    if (regionList?.length === 1) {
      setRegion(regionList?.[0]?.region);
      setFieldsValue({ region: regionList?.[0]?.region });
    }
  }, [regionList, currentRegion, setFieldsValue]);

  if (isSilent) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Title inLogin={true} />
      <Row>
        <Col className={styles.left} span={10}>
          <div className={styles.banner}>
            <img src={WelcomeImg} className={styles.welcomeImg} />
          </div>
          <div className={styles.titles}>
            <h1>Operation Platform</h1>
            <h1>Support Center</h1>
            <div className={styles.divider} />
            <h3>Where System Stay Watched, Operation Stay Secured</h3>
          </div>
        </Col>
        <Col className={styles.right}>
          <div className={styles.login}>
            <div className={styles.header}>
              <h1>Welcome Back</h1>
              <h3>Hey buddy, Please enter your details</h3>
            </div>
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
                    placeholder={formatMessageApi({ Label_COM_Opus: 'UserID' })}
                    variant={'outlined'}
                    onBlur={handleUserId}
                  />
                )}
              </Form.Item>
              <Form.Item label={'Region'} help={regionError || ''}>
                {form.getFieldDecorator('region', {
                  rules: [{ required: true, message: 'Please input your region!' }],
                })(
                  <Select
                    onSelect={handleRegionChange}
                    variant={'outlined'}
                    value={currentRegion}
                    disabled={!regionList}
                  >
                    {lodash.map(regionConfigs, ({ region, title }: any) => {
                      return (
                        <Select.Option value={region} key={region}>
                          {title}
                        </Select.Option>
                      );
                    })}
                  </Select>
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
                    type="password"
                    variant={'outlined'}
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
                  {formatMessageApi({ Label_COM_General: 'Continue' })}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      {/* <Close
        show={errorMsg?.show}
        hiddenIcon
        title="Error"
        handleClose={() => {
          setErrorMsg({ show: false, message: '' });
        }}
      >
        {errorMsg.message}
      </Close> */}
      <div className={styles.bottomTitle}>
        <h1>Support Center</h1>
        <div className={styles.bottomColorBanner} />
      </div>
    </div>
  );
};

export default Form.create({
  name: 'support_center_login_form',
  onFieldsChange(props: any, changedFields: any) {
    const { remember } = changedFields;
    if (remember && remember.touched && !remember.value) {
      LS.removeItem(LSKey.SUPPORT_CENTER_REMEMBER_USER);
    }
  },
})(Login);
