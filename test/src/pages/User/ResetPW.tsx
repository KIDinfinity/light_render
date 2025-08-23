import React, { useState } from 'react';
import { useDispatch } from 'dva';
import {history } from 'umi';
import * as router from 'react-router-dom';
import { Form, Input, Button, Icon, notification } from 'antd';
import type { WrappedFormUtils } from 'antd/lib/form/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PasswordStrength from 'navigator/pages/User/_components/PasswordStrength';
import styles from './ResetPW.less';

export default Form.create()(({ form, location }: { form: WrappedFormUtils; location: any }) => {
  const { Link } = router;
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();
  const [confirmNewPasswordDirty, setConfirmNewPasswordDirty] = useState(false);
  const handleConfirmNewPasswordBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmNewPasswordDirty(confirmNewPasswordDirty || !!value);
  };
  const validateToNextPassword = (rule: any, value: any, callback: () => void) => {
    if (value && confirmNewPasswordDirty) {
      form.validateFields(['confirmNewPassword'], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule: any, value: any, callback: (errmsg?: string) => void) => {
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(formatMessageApi({ Label_COM_General: 'Inconsistent' }));
    } else {
      callback();
    }
  };
  const handleSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const response = await dispatch({
          type: 'login/resetPassword',
          payload: {
            password: values.newPassword,
            sid: location.query.sid,
          },
        });
        // @ts-ignore
        if (response.success) {
          form.resetFields();
          notification.success({
            message: formatMessageApi({ Label_COM_General: 'PasswordModifiedSuccess' }),
            duration: 3,
          });
          history.push('/user/login');
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
  return (
    <div className={styles.resetpw}>
      <p className={styles.info}>Choose a new password.</p>
      <Form className={styles.form}>
        <Form.Item>
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_COM_General: 'InputNewPassword' }),
              },
              { min: 6 },
              {
                validator: validateToNextPassword,
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              maxLength={16}
              size="large"
              placeholder="New password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirmNewPassword', {
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_COM_General: 'InputPasswordAgain' }),
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              maxLength={16}
              size="large"
              placeholder="Confirm new password"
              onBlur={handleConfirmNewPasswordBlur}
            />
          )}
        </Form.Item>
        <PasswordStrength password={form.getFieldValue('newPassword')} />
        <Button block type="primary" size="large" onClick={handleSubmit}>
          {formatMessageApi({
            Label_BIZ_Claim: 'form.confirm',
          })}
        </Button>
      </Form>
      <Link to="/user/login">&lt; Login</Link>
    </div>
  );
});
