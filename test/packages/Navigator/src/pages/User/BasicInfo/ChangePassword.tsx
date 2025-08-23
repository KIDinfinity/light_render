import React, { useState } from 'react';
import { useDispatch } from 'dva';
import { Button, Modal, Form, notification, Input, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { WrappedFormUtils } from 'antd/lib/form/Form';
import handleMessageModal from '@/utils/commonMessage';
import PasswordStrength from '../_components/PasswordStrength';
import styles from './ChangePassword.less';

const ChangePassword = Form.create()(({ form }: { form: WrappedFormUtils }) => {
  const dispatch = useDispatch();
  const { getFieldDecorator } = form;
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [confirmNewPasswordDirty, setConfirmNewPasswordDirty] = useState(false);
  const handleOpenChangePasswordModal = () => {
    setChangePasswordModalVisible(true);
  };
  const handleChangePasswordComfirm = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const response = await dispatch({
          type: 'login/changePassword',
          payload: {
            password: values.oldPassword,
            newPassword: values.newPassword,
          },
        });
        // @ts-ignore
        if (response.success) {
          setChangePasswordModalVisible(false);
          form.resetFields();
          notification.success({
            message: formatMessageApi({ Label_COM_General: 'PasswordModifiedSuccess' }),
            duration: 3,
          });
        } else {
          // @ts-ignore
          handleMessageModal(response.promptMessages);
        }
      }
    });
  };
  const handleChangePasswordCancel = () => {
    form.resetFields();
    setChangePasswordModalVisible(false);
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (mutation.target.style.overflow === 'hidden') {
            Object.assign(document.body.style, {
              overflow: 'inherit',
            });
          }
        }
      });
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });
  };
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
  return (
    <>
      <Button onClick={handleOpenChangePasswordModal}>
        {formatMessageApi({
          Label_COM_General: 'ChangePassword',
        })}
      </Button>
      <Modal
        title={
          <div className={styles['modal-title']}>
            <Icon type="lock" />
            <span>
              {formatMessageApi({
                Label_COM_General: 'ChangePassword',
              })}
            </span>
          </div>
        }
        visible={changePasswordModalVisible}
        onCancel={handleChangePasswordCancel}
        footer={null}
        centered
      >
        <Form className={styles['change-password-form']}>
          <Form.Item label="Old Password">
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: formatMessageApi({ Label_COM_General: 'InputOldPassword' }),
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="New Password">
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: formatMessageApi({ Label_COM_General: 'InputNewPassword' }),
                },
                { min: 6, message: formatMessageApi({ Label_COM_General: 'PasswordHint' }) },
                {
                  validator: validateToNextPassword,
                },
              ],
            })(<Input.Password maxLength={16} />)}
          </Form.Item>
          <PasswordStrength password={form.getFieldValue('newPassword')} />
          <Form.Item label="Confirm new Password">
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
            })(<Input.Password maxLength={16} onBlur={handleConfirmNewPasswordBlur} />)}
          </Form.Item>
          <Button
            type="primary"
            size="large"
            onClick={handleChangePasswordComfirm}
            className={styles.confirm}
          >
            {formatMessageApi({
              Label_BIZ_Claim: 'form.confirm',
            })}
          </Button>
        </Form>
      </Modal>
    </>
  );
});

export default ChangePassword;
