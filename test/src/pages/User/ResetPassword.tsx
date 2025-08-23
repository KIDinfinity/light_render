import React, { useState } from 'react';
import { useSelector, useDispatch, connect } from 'dva';
import { Form, Modal, Input, Button, Icon, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import styles from './ResetPassword.less';

const ResetPassword = ({
  form,
  resetParams,
  setResetParams,
  showResetPassword,
  setShowResetPassword,
}: any) => {
  const { getFieldDecorator } = form;
  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const dispatch = useDispatch();

  const resetLoading = useSelector(
    (state: any) => state.loading.effects['login/resetPasswordByVerCode']
  );

  // useEffect(() => {
  //   form.resetFields();
  // }, [form]);

  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const response: any = await dispatch({
          type: 'login/resetPasswordByVerCode',
          payload: {
            ...lodash.pick(resetParams, ['tenant', 'region', 'userId']),
            ...lodash.pick(values, ['verCode', 'password']),
          },
        });
        // @ts-ignore
        if (response.success) {
          form.resetFields();
          notification.success({
            message: formatMessageApi({ Label_COM_General: 'EmailSentSuccess' }),
          });
          setShowResetPassword(false);
          setResetParams({});
        } else {
          // @ts-ignore
          notification.error({
            message: response?.resultData?.content,
            duration: 3,
          });
        }
      }
    });
  };

  let timer: any = null;

  const Timer = () => {
    let count = 60;
    timer = setInterval(() => {
      setCountDown(count - 1);
      if (count === 1) {
        setCountDown(60);
        setShowCountDown(false);
        clearTimeout(timer);
        return;
      }
      count--;
    }, 1000);
  };

  const handleSendEmail = async () => {
    const response: any = await dispatch({
      type: 'login/sendVerCodeEmail',
      payload: {
        ...lodash.pick(resetParams, ['tenant', 'region', 'userId']),
      },
    });
    if (response.success) {
      notification.success({
        message: formatMessageApi({ Label_COM_General: 'EmailSentSuccess' }),
        duration: 3,
      });
      setShowCountDown(true);
      Timer();
    } else {
      // @ts-ignore
      notification.error({
        message: response?.resultData?.content,
        duration: 3,
      });
    }
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessageApi({ Label_COM_Message: 'MSG_000721' }));
    } else {
      callback();
    }
  };

  return (
    <Modal
      className={styles.sendemail}
      width={400}
      centered
      title={formatMessageApi({ Label_BIZ_Claim: 'ResetPassword' })}
      visible={showResetPassword}
      onCancel={() => {
        setResetParams({});
        setShowResetPassword(false);
      }}
      footer={null}
    >
      <Form className={styles.form}>
        <Form.Item>
          {getFieldDecorator('userId', {
            initialValue: resetParams.userId || '',
          })(<Input prefix={<Icon type="user" />} size="large" disabled />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('mailAddress', {
            initialValue: resetParams.mailAddress || '',
          })(
            <Input
              prefix={<Icon type="mail" />}
              size="large"
              disabled
              addonAfter={
                <>
                  {showCountDown ? (
                    <span className={styles.countDown}>
                      {countDown} {formatMessageApi({ Label_Sider_Envoy: 'Send' })}
                    </span>
                  ) : (
                    <span
                      className={styles.sendEmail}
                      onClick={() => {
                        handleSendEmail();
                      }}
                    >
                      {formatMessageApi({ Label_Sider_Envoy: 'Send' })}
                    </span>
                  )}
                </>
              }
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('verCode', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_BIZ_Claim: 'InputVerificationCode' }),
              },
            ],
          })(
            <Input
              size="large"
              autoComplete="disable-chrome-autofill-mark"
              placeholder={formatMessageApi({ Label_BIZ_Claim: 'InputVerificationCode' })}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            initialValue: resetParams.password || '',
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_COM_General: 'InputNewPassword' }),
              },
            ],
          })(
            <Input.Password
              autoComplete="disable-chrome-autofill-mark"
              prefix={<Icon type="lock" />}
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirnPassword', {
            initialValue: resetParams.confirnPassword || '',
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_COM_General: 'InputPasswordAgain' }),
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password prefix={<Icon type="lock" />} maxLength={16} size="large" />)}
        </Form.Item>
        <Button block loading={resetLoading} type="primary" size="large" onClick={handleSubmit}>
          {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
        </Button>
      </Form>
    </Modal>
  );
};

export default connect()(Form.create<any>({})(ResetPassword));
