import React, { useState, useEffect, useRef } from 'react';
import { formUtils } from 'basic/components/Form';
import { useDispatch, useSelector } from 'dva';
import { Button, Form } from 'antd';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { FormItemInput } from 'basic/components/Form';

import styles from './index.less';

export default () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const ref: any = useRef();

  useEffect(() => {
    (async () => {
      const result = await dispatch({ type: 'sqlController/getCredentials' });
      if (!result?.username) {
        setVisible(true);
      }
    })();
  }, []);

  const gitAccount = useSelector(({ sqlController }: any) => sqlController?.gitAccount);

  const GitForm = Form.create({
    mapPropsToFields() {
      return formUtils.mapObjectToFields(gitAccount);
    },
  })(({ form }: any) => {
    const onOk = () => {
      form.validateFields({ force: true }, (errors: any, values: any) => {
        if (errors) {
          ref?.current?.hideLoading?.();
          return;
        }
        dispatch({ type: 'sqlController/setCredentials', payload: values });
        setVisible(false);
      });
    };

    return (
      <ModalWarnMessage
        ref={ref}
        visible={visible}
        width={600}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={onOk}
        okText="OK"
        closable={false}
        className={styles.gitModal}
        cancelText="Cancel"
        hiddenExtraText
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      >
        <Form>
          <FormItemInput
            form={form}
            formName="username"
            labelId="configuration.label.fieldName.userName"
            required
          />
          <FormItemInput
            form={form}
            formName="password"
            labelId="Password "
            required
            type="password"
          />
        </Form>
      </ModalWarnMessage>
    );
  });

  return (
    <div className={styles.git}>
      <Button onClick={() => setVisible(true)} type="primary" icon="form">
        Git Account
      </Button>
      <GitForm />
    </div>
  );
};
