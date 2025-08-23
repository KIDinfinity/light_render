import React, { useState } from 'react';
import { Col, Icon } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Validator,
  Visible,
  Rule,
} from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { localConfig } from '../index';
import { localFieldConfig } from './PolicyNo.config';

export { localFieldConfig } from './PolicyNo.config';
import { NAMESPACE } from '../../../../activity.config';
import styles from '../../index.less';
import { handleMessageModal } from '@/utils/commonMessage';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

let prevAbortController: any = null;
let timer = null;
let retryTimer = null;

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.mainPolicyId
  );

  const fieldProps: any = localFieldConfig['field-props'];

  const loopTime = async (asyncId, resolve) => {
    if (lodash.isEmpty(retryTimer)) {
      retryTimer = moment();
    }
    if (moment().diff(retryTimer, 'second') >= 32) {
      retryTimer = null;
      resolve({ status: 'error' });
      handleMessageModal([{ content: formatMessageApi({ Label_COM_Message: 'MSG_000898' }) }]);
      return false;
    }
    const abortController = new AbortController();

    prevAbortController = abortController;

    const result = await dispatch({
      type: `${NAMESPACE}/getPolicyInfoAsyncLoop`,
      signal: abortController.signal,
      payload: {
        asyncId,
      },
    });
    if (result.status === 'inProgress') {
      setTimeout(() => {
        loopTime(asyncId, resolve);
      }, 5000);
    } else {
      retryTimer = null;
      resolve(result);
    }
  };

  const getPolicyNo = async (reload) => {
    setLoading(true);
    const policyNo = form.getFieldValue('policyNo');
    if (mainPolicyId === policyNo && !reload) {
      setLoading(false);
      return;
    }
    let errors = {};
    try {
      await form.validateFields([field]);
    } catch (error) {
      errors = error;
    }
    if (!lodash.isEmpty(errors)) {
      setLoading(false);
      return;
    }
    await dispatch({
      type: `${NAMESPACE}/policyIdUpdate`,
      payload: {
        policyId: policyNo,
      },
    });
    const abortController = new AbortController();

    prevAbortController = abortController;
    const asyncId = await dispatch({
      type: `${NAMESPACE}/policyInfoRemoteAsyncStart`,
      signal: abortController.signal,
      payload: {
        policyNo,
      },
    });

    const result = await new Promise((resolve: any) => {
      timer = loopTime(asyncId, resolve);
    });

    if (result?.status === 'finish') {
      await dispatch({
        type: `${NAMESPACE}/policyInfoRemoteAsyncEnd`,
        payload: {
          data: result?.data,
          policyNo,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/saveSnapshot`,
      });
    }
    setLoading(false);
  };

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = { VLD_000814: Validator.VLD_000814() };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          onBlur={() => {
            getPolicyNo(false);
          }}
          className={styles.policyId}
          disabled={
            loading ||
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          suffix={
            editable && (
              <div className={styles.icons}>
                {loading && (
                  <div>
                    <Icon type="loading" />
                  </div>
                )}
                {!loading && !lodash.isNil(form.getFieldValue('policyNo')) && (
                  <Icon
                    type="reload"
                    onClick={() => {
                      getPolicyNo(true);
                    }}
                  />
                )}
              </div>
            )
          }
        />
      </Col>
    )
  );
};

const PolicyNo = ({ isShow, layout, form, editable, section }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

PolicyNo.displayName = localFieldConfig.field;

export default PolicyNo;
