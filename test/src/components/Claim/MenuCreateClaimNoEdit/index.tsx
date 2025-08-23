import React, { useEffect, useMemo } from 'react';
import { Form, Input } from 'antd';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltip from '@/components/ErrorTooltip';
import navigatorManualCreateControllerService from '@/services/navigatorManualCreateControllerService';
import styles from './index.less';

function MenuCreateClaimNoEdit({ form, taskDetail }) {
  const caseCategory = useMemo(() => taskDetail?.caseCategory, [taskDetail]);
  const dispatch = useDispatch();
  const validate = async (rule, claimNo, callback) => {
    if (lodash.isEmpty(claimNo)) {
      callback();
      dispatch({
        type: 'menuCreateCaseClaim/setErrors',
        payload: {
          errors: [],
        },
      });
      return;
    }
    if (!claimNo.match(/^[0-9]{12}$/g)) {
      const message = formatMessageApi({
        Label_COM_WarningMessage: 'ERR_000132',
      });
      callback(message);
      dispatch({
        type: 'menuCreateCaseClaim/setErrors',
        payload: {
          errors: [message],
        },
      });
      return;
    }
    const response = await navigatorManualCreateControllerService.refreshData(
      objectToFormData({ caseCategory, claimNo })
    );
    if (!response?.success) {
      const serviceMessage = response?.promptMessages[0]?.content;
      callback(serviceMessage);
      dispatch({
        type: 'menuCreateCaseClaim/setErrors',
        payload: {
          errors: [serviceMessage],
        },
      });
    } else {
      dispatch({
        type: 'menuCreateCaseClaim/setErrors',
        payload: {
          errors: [],
        },
      });
    }
  };
  useEffect(() => {
    dispatch({
      type: 'menuCreateCaseClaim/register',
      payload: {
        form,
      },
    });
  }, [form]);
  return (
    <Form className={styles.form}>
      <Form.Item
        label={
          <ErrorTooltip
            form={form}
            formName="claimNo"
            title={formatMessageApi({
              Label_COM_General: 'BusinessNo',
            })}
          />
        }
      >
        {form.getFieldDecorator('claimNo', {
          validateTrigger: 'onBlur',
          rules: [
            {
              validator: validate,
            },
          ],
        })(<Input maxLength={12} />)}
      </Form.Item>
    </Form>
  );
}

export default Form.create()(MenuCreateClaimNoEdit);
